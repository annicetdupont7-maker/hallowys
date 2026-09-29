'use client';

/**
 * PANIER HALLOWYS
 * ----------------------------------------------------------------------------
 * Source unique de l'état du panier, partagée par le header, les boutons
 * d'ajout et la page panier. Seuls le slug, l'option et la quantité sont
 * persistés dans localStorage : le prix, le nom et le stock sont relus dans le
 * catalogue à chaque rendu, donc un panier ne peut jamais afficher un prix
 * différent de la fiche produit.
 */

import { useSyncExternalStore } from 'react';
import { getProduct, type Product } from './catalog';

export type CartItem = {
  slug: string;
  option?: string;
  quantity: number;
};

export type CartLine = CartItem & {
  key: string;
  product: Product;
  lineTotal: number;
};

const STORAGE_KEY = 'hallowys.cart.v1';

/** Livraison offerte à partir de ce sous-total, en centimes. */
export const FREE_SHIPPING_THRESHOLD = 4900;
export const SHIPPING_COST = 490;

const EMPTY: CartItem[] = [];

let items: CartItem[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

export function lineKey(slug: string, option?: string): string {
  return option ? `${slug}::${option}` : slug;
}

/**
 * Relit localStorage en écartant tout ce qui ne correspond plus au catalogue
 * (produit supprimé, option inconnue, quantité invalide) et en plafonnant
 * chaque quantité au stock réel.
 */
function sanitize(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return EMPTY;
  const result: CartItem[] = [];
  for (const entry of raw) {
    if (!entry || typeof entry !== 'object') continue;
    const { slug, option, quantity } = entry as Partial<CartItem>;
    const product = typeof slug === 'string' ? getProduct(slug) : undefined;
    if (!product || typeof quantity !== 'number' || quantity < 1) continue;
    if (product.options ? !product.options.values.includes(option ?? '') : option) continue;
    const capped = Math.min(Math.floor(quantity), product.stock);
    if (capped < 1) continue;
    result.push({ slug: product.slug, option: product.options ? option : undefined, quantity: capped });
  }
  return result;
}

function read(): CartItem[] {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? sanitize(JSON.parse(stored)) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function ensureLoaded() {
  if (loaded || typeof window === 'undefined') return;
  items = read();
  loaded = true;
}

function commit(next: CartItem[]) {
  items = next.length === 0 ? EMPTY : next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* Stockage indisponible (navigation privée stricte) : le panier reste en mémoire. */
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  /* Synchronise les onglets ouverts : un ajout dans l'un met l'autre à jour. */
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    items = read();
    listener();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

function getSnapshot() {
  ensureLoaded();
  return items;
}

function getServerSnapshot() {
  return EMPTY;
}

/* ------------------------------------------------------------ ACTIONS -- */

/** Ajoute au panier. Renvoie la quantité réellement ajoutée (limitée au stock). */
export function addToCart(slug: string, quantity: number, option?: string): number {
  ensureLoaded();
  const product = getProduct(slug);
  if (!product || quantity < 1) return 0;

  const key = lineKey(slug, option);
  const existing = items.find((item) => lineKey(item.slug, item.option) === key);
  const inCartForProduct = items
    .filter((item) => item.slug === slug)
    .reduce((sum, item) => sum + item.quantity, 0);
  const added = Math.min(quantity, product.stock - inCartForProduct);
  if (added < 1) return 0;

  commit(
    existing
      ? items.map((item) =>
          lineKey(item.slug, item.option) === key ? { ...item, quantity: item.quantity + added } : item,
        )
      : [...items, { slug, option, quantity: added }],
  );
  notifyAdded({ product, option, quantity: added });
  return added;
}

export function setQuantity(key: string, quantity: number) {
  ensureLoaded();
  if (quantity < 1) {
    removeFromCart(key);
    return;
  }
  commit(
    items.map((item) => {
      if (lineKey(item.slug, item.option) !== key) return item;
      const product = getProduct(item.slug);
      const others = items
        .filter((other) => other.slug === item.slug && other !== item)
        .reduce((sum, other) => sum + other.quantity, 0);
      const max = product ? product.stock - others : item.quantity;
      return { ...item, quantity: Math.max(1, Math.min(quantity, max)) };
    }),
  );
}

export function removeFromCart(key: string) {
  ensureLoaded();
  commit(items.filter((item) => lineKey(item.slug, item.option) !== key));
}

export function clearCart() {
  commit(EMPTY);
}

/* -------------------------------------------------------------- HOOKS -- */

export function useCartItems(): CartItem[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

const noopSubscribe = () => () => {};

/**
 * false au premier rendu (serveur et hydratation), true ensuite : évite
 * d'afficher « panier vide » avant la lecture de localStorage.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

export function summarize(cartItems: CartItem[]) {
  const lines: CartLine[] = [];
  for (const item of cartItems) {
    const product = getProduct(item.slug);
    if (!product) continue;
    lines.push({
      ...item,
      key: lineKey(item.slug, item.option),
      product,
      lineTotal: product.price * item.quantity,
    });
  }
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const savings = lines.reduce(
    (sum, line) => sum + (line.product.oldPrice ? (line.product.oldPrice - line.product.price) * line.quantity : 0),
    0,
  );
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  return { lines, count, subtotal, savings, shipping, total: subtotal + shipping };
}

export function useCart() {
  return summarize(useCartItems());
}

/** Quantité déjà présente dans le panier pour un produit, toutes options confondues. */
export function useQuantityInCart(slug: string): number {
  return useCartItems()
    .filter((item) => item.slug === slug)
    .reduce((sum, item) => sum + item.quantity, 0);
}

/* ------------------------------------------------- NOTIFICATION D'AJOUT -- */

export type AddedNotice = { id: number; product: Product; option?: string; quantity: number };

let notice: AddedNotice | null = null;
let noticeId = 0;
const noticeListeners = new Set<() => void>();

function notifyAdded(payload: Omit<AddedNotice, 'id'>) {
  noticeId += 1;
  notice = { ...payload, id: noticeId };
  noticeListeners.forEach((listener) => listener());
}

export function dismissNotice() {
  notice = null;
  noticeListeners.forEach((listener) => listener());
}

export function useAddedNotice(): AddedNotice | null {
  return useSyncExternalStore(
    (listener) => {
      noticeListeners.add(listener);
      return () => noticeListeners.delete(listener);
    },
    () => notice,
    () => null,
  );
}
