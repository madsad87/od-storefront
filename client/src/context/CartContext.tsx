import { gql, useMutation, useQuery } from "@apollo/client";
import { createContext, useCallback, useContext, type ReactNode } from "react";
import {
  ADD_TO_CART,
  EMPTY_CART,
  REMOVE_CART_ITEM,
  UPDATE_CART_ITEM_QUANTITY,
} from "../graphql/mutations";
import { GET_CART } from "../graphql/queries";
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

interface WooCartNode {
  key?: string;
  quantity?: number;
  variation?: {
    node?: {
      attributes?: {
        nodes?: Array<{
          name?: string | null;
          value?: string | null;
        }>;
      };
    };
  };
  product?: {
    node?: {
      databaseId?: number;
      slug?: string;
      name?: string;
      price?: string | null;
      image?: {
        sourceUrl?: string;
      };
    };
  };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const GET_CART_QUERY = gql(GET_CART);
const ADD_TO_CART_MUTATION = gql(ADD_TO_CART);
const REMOVE_CART_ITEM_MUTATION = gql(REMOVE_CART_ITEM);
const UPDATE_CART_ITEM_QUANTITY_MUTATION = gql(UPDATE_CART_ITEM_QUANTITY);
const EMPTY_CART_MUTATION = gql(EMPTY_CART);

const parsePrice = (price?: string | null) => {
  if (!price) {
    return 0;
  }

  const parsed = Number.parseFloat(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
};

const getSizeFromNode = (node: WooCartNode) => {
  const sizeAttribute = node.variation?.node?.attributes?.nodes?.find((attribute) => {
    const normalizedName = attribute.name?.toLowerCase();
    return normalizedName === "size" || normalizedName === "pa_size";
  });

  return sizeAttribute?.value ?? "Default";
};

const toCartItem = (node: WooCartNode): CartItem | null => {
  const productNode = node.product?.node;
  const productId = productNode?.databaseId;

  if (!productNode || !productId) {
    return null;
  }

  const price = parsePrice(productNode.price);

  return {
    key: node.key,
    size: getSizeFromNode(node),
    quantity: node.quantity ?? 1,
    product: {
      id: productId,
      slug: productNode.slug ?? String(productId),
      name: productNode.name ?? "Unknown product",
      price,
      regularPrice: price,
      sizes: [getSizeFromNode(node)],
      description: "",
      image: productNode.image?.sourceUrl ?? "",
    },
  };
};

export function CartProvider({ children }: { children: ReactNode }) {
  const {
    data: cartData,
    loading: cartLoading,
    error: cartError,
  } = useQuery(GET_CART_QUERY, {
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
    ssr: false,
  });

  const [addToCartMutation, { loading: adding }] = useMutation(ADD_TO_CART_MUTATION, {
    refetchQueries: [GET_CART_QUERY],
    awaitRefetchQueries: true,
  });
  const [removeCartItemMutation, { loading: removing }] = useMutation(REMOVE_CART_ITEM_MUTATION, {
    refetchQueries: [GET_CART_QUERY],
    awaitRefetchQueries: true,
  });
  const [updateCartItemQuantityMutation, { loading: updating }] = useMutation(
    UPDATE_CART_ITEM_QUANTITY_MUTATION,
    {
      refetchQueries: [GET_CART_QUERY],
      awaitRefetchQueries: true,
    }
  );
  const [emptyCartMutation, { loading: clearing }] = useMutation(EMPTY_CART_MUTATION, {
    refetchQueries: [GET_CART_QUERY],
    awaitRefetchQueries: true,
  });

  const nodes: WooCartNode[] = cartData?.cart?.contents?.nodes ?? [];
  const items = nodes.map(toCartItem).filter((item): item is CartItem => Boolean(item));

  const getItemKey = useCallback(
    (productId: number, size: string) =>
      items.find((item) => item.product.id === productId && item.size === size)?.key,
    [items]
  );

  const addItem = useCallback(
    (product: Product, size: string) => {
      if (cartError) {
        return;
      }

      void addToCartMutation({
        variables: {
          productId: product.id,
          quantity: 1,
          variation: [{ attributeName: "pa_size", attributeValue: size }],
        },
      });
    },
    [addToCartMutation, cartError]
  );

  const removeItem = useCallback(
    (productId: number, size: string) => {
      const key = getItemKey(productId, size);
      if (!key || cartError) {
        return;
      }

      void removeCartItemMutation({ variables: { keys: [key] } });
    },
    [cartError, getItemKey, removeCartItemMutation]
  );

  const updateQuantity = useCallback(
    (productId: number, size: string, quantity: number) => {
      const key = getItemKey(productId, size);
      if (!key || cartError) {
        return;
      }

      if (quantity <= 0) {
        void removeCartItemMutation({ variables: { keys: [key] } });
        return;
      }

      void updateCartItemQuantityMutation({ variables: { key, quantity } });
    },
    [cartError, getItemKey, removeCartItemMutation, updateCartItemQuantityMutation]
  );

  const clearCart = useCallback(() => {
    if (cartError) {
      return;
    }

    void emptyCartMutation();
  }, [cartError, emptyCartMutation]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const isLoading = cartLoading || adding || removing || updating || clearing;

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
