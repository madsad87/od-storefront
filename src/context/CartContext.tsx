import {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useState,
  type ReactNode,
} from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Product } from "../lib/product-types";
import { wordpressRequest } from "@/lib/wordpress/client";
import {
  ADD_TO_CART,
  EMPTY_CART,
  GET_CART,
  REMOVE_CART_ITEM,
  UPDATE_CART_ITEM_QUANTITY,
} from "@/lib/wordpress/queries/cart";

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
  error?: string | null;
}

interface CartNode {
  key: string;
  quantity: number;
  product: {
    node: {
      databaseId: number;
      slug: string;
      name: string;
      price: string | null;
      image: { sourceUrl: string | null } | null;
    } | null;
  };
  variation?: {
    node?: {
      attributes?: {
        nodes?: Array<{ name: string; value: string }>;
      };
    };
  } | null;
}

interface GetCartResponse {
  cart: {
    subtotal: string | null;
    contents: { nodes: CartNode[] };
  } | null;
}

const CART_QUERY_KEY = ["wordpress", "cart"] as const;

const CartContext = createContext<CartContextType | undefined>(undefined);

function parsePrice(price: string | null | undefined) {
  if (!price) {
    return 0;
  }
  return Number.parseFloat(price.replace(/[^0-9.]/g, "")) || 0;
}

function deriveSize(node: CartNode) {
  const sizeAttr = node.variation?.node?.attributes?.nodes?.find((attr) =>
    ["size", "pa_size"].includes(attr.name.toLowerCase()),
  );
  return sizeAttr?.value || "One Size";
}

function mapCartItems(data: GetCartResponse | undefined): CartItem[] {
  const nodes = data?.cart?.contents?.nodes || [];

  return nodes
    .filter((node) => node.product?.node)
    .map((node) => {
      const productNode = node.product.node!;
      const price = parsePrice(productNode.price);

      return {
        key: node.key,
        quantity: node.quantity,
        size: deriveSize(node),
        product: {
          id: productNode.databaseId,
          slug: productNode.slug,
          name: productNode.name,
          price,
          sizes: [],
          description: "",
          image: productNode.image?.sourceUrl || "",
        },
      };
    });
}

export function CartProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [actionError, setActionError] = useState<string | null>(null);

  const cartQuery = useQuery({
    queryKey: CART_QUERY_KEY,
    queryFn: () => wordpressRequest<GetCartResponse>(GET_CART, { includeSession: true }),
  });

  const refreshCart = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
  }, [queryClient]);

  const addMutation = useMutation({
    mutationFn: async ({ product, size }: { product: Product; size: string }) => {
      await wordpressRequest(ADD_TO_CART, {
        includeSession: true,
        variables: {
          productId: product.id,
          quantity: 1,
          variation: [{ attributeName: "pa_size", attributeValue: size }],
        },
      });
    },
    onSuccess: refreshCart,
  });

  const removeMutation = useMutation({
    mutationFn: async ({ key }: { key: string }) => {
      await wordpressRequest(REMOVE_CART_ITEM, {
        includeSession: true,
        variables: { keys: [key] },
      });
    },
    onSuccess: refreshCart,
  });

  const updateMutation = useMutation({
    mutationFn: async ({ key, quantity }: { key: string; quantity: number }) => {
      await wordpressRequest(UPDATE_CART_ITEM_QUANTITY, {
        includeSession: true,
        variables: { key, quantity },
      });
    },
    onSuccess: refreshCart,
  });

  const clearMutation = useMutation({
    mutationFn: async () => {
      await wordpressRequest(EMPTY_CART, { includeSession: true });
    },
    onSuccess: refreshCart,
  });

  const items = useMemo(() => mapCartItems(cartQuery.data), [cartQuery.data]);

  const addItem = useCallback(
    (product: Product, size: string) => {
      setActionError(null);
      addMutation.mutate(
        { product, size },
        { onError: (error) => setActionError((error as Error).message) },
      );
    },
    [addMutation],
  );

  const findKeyForItem = useCallback(
    (productId: number, size: string) =>
      items.find((item) => item.product.id === productId && item.size === size)?.key,
    [items],
  );

  const removeItem = useCallback(
    (productId: number, size: string) => {
      setActionError(null);
      const key = findKeyForItem(productId, size);
      if (!key) {
        return;
      }
      removeMutation.mutate(
        { key },
        { onError: (error) => setActionError((error as Error).message) },
      );
    },
    [findKeyForItem, removeMutation],
  );

  const updateQuantity = useCallback(
    (productId: number, size: string, quantity: number) => {
      setActionError(null);
      const key = findKeyForItem(productId, size);
      if (!key) {
        return;
      }

      if (quantity <= 0) {
        removeMutation.mutate(
          { key },
          { onError: (error) => setActionError((error as Error).message) },
        );
        return;
      }

      updateMutation.mutate(
        { key, quantity },
        { onError: (error) => setActionError((error as Error).message) },
      );
    },
    [findKeyForItem, removeMutation, updateMutation],
  );

  const clearCart = useCallback(() => {
    setActionError(null);
    clearMutation.mutate(undefined, {
      onError: (error) => setActionError((error as Error).message),
    });
  }, [clearMutation]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const fallbackSubtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const subtotal = parsePrice(cartQuery.data?.cart?.subtotal) || fallbackSubtotal;

  const isLoading =
    cartQuery.isLoading ||
    addMutation.isPending ||
    removeMutation.isPending ||
    updateMutation.isPending ||
    clearMutation.isPending;

  const error = actionError || cartQuery.error?.message || null;

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
        isLoading,
        error,
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
