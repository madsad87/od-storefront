/**
 * CART CONTEXT
 * =============
 * Manages shopping cart state for the entire app.
 *
 * CURRENT: Local React state (useState) — works as standalone SPA
 * TARGET:  WooCommerce GraphQL mutations via Apollo Client
 *
 * MIGRATION TO WOOGRAPHQL:
 * 1. Replace useState([]) with useQuery(GET_CART) from graphql/queries.ts
 * 2. Replace addItem internals with useMutation(ADD_TO_CART) from graphql/mutations.ts
 * 3. Replace removeItem with useMutation(REMOVE_CART_ITEM)
 * 4. Replace updateQuantity with useMutation(UPDATE_CART_ITEM_QUANTITY)
 * 5. Replace clearCart with useMutation(EMPTY_CART)
 * 6. Session token management: capture woocommerce-session header from responses,
 *    store in localStorage, send as Authorization header on subsequent requests.
 *    Consider @woographql/session-utils package for this.
 *
 * The CartContextType interface stays the same — all UI components continue to
 * call useCart() without any changes. Only the Provider internals change.
 */

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Product } from "../lib/product-types";

export interface CartItem {
  key?: string;
  product: Product;
  size: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size: string) => void;
  removeItem: (productId: number, size: string) => void;
  updateQuantity: (productId: number, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isLoading?: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  /* ─── SWAP POINT: addItem ─── */
  /* Replace with: useMutation(ADD_TO_CART, { variables: { productId, quantity: 1, variation: [{ attributeName: "pa_size", attributeValue: size }] } }) */
  const addItem = useCallback((product: Product, size: string) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, size, quantity: 1 }];
    });
  }, []);

  /* ─── SWAP POINT: removeItem ─── */
  /* Replace with: useMutation(REMOVE_CART_ITEM, { variables: { keys: [cartItem.key] } }) */
  const removeItem = useCallback((productId: number, size: string) => {
    setItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.size === size)
      )
    );
  }, []);

  /* ─── SWAP POINT: updateQuantity ─── */
  /* Replace with: useMutation(UPDATE_CART_ITEM_QUANTITY, { variables: { key: cartItem.key, quantity } }) */
  const updateQuantity = useCallback(
    (productId: number, size: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId, size);
        return;
      }
      setItems((prev) =>
        prev.map((item) =>
          item.product.id === productId && item.size === size
            ? { ...item, quantity }
            : item
        )
      );
    },
    [removeItem]
  );

  /* ─── SWAP POINT: clearCart ─── */
  /* Replace with: useMutation(EMPTY_CART) */
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
