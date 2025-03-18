import {
  getOrCreateCart,
  syncCartWithUser,
  updateCartItems,
} from "@/actions/cart-actions";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
};

type CartStore = {
  items: CartItem[];
  isLoading: boolean;
  isOpen: boolean;
  cartId: string | null;
  setStore: (store: Partial<CartStore>) => void;
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  open: () => void;
  close: () => void;
  setIsLoading: (loaded: boolean) => void;
  syncWithUser: () => Promise<void>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isLoading: false,
      cartId: null,

      setStore: (store) => set(store),

      addItem: async (item) => {
        const { cartId, items } = get();
        if (!cartId) {
          return;
        }

        const existingItem = items.find((i) => i.id === item.id);

        if (existingItem) {
          // Update the quantity of the existing item
          const updatedCart = await updateCartItems(cartId, item.id, {
            quantity: existingItem.quantity + item.quantity,
          });

          set((state) => ({
            ...state,
            cartId: updatedCart.id,
            items: state.items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          }));
        } else {
          // Add the new item to the cart
          const updatedCart = await updateCartItems(cartId, item.id, {
            title: item.title,
            price: item.price,
            image: item.image,
            quantity: item.quantity,
          });

          set((state) => ({
            ...state,
            cartId: updatedCart.id,
            items: [...state.items, { ...item }],
          }));
        }
      },

      removeItem: async (id) => {
        const { cartId } = get();
        if (!cartId) {
          return;
        }

        const updatedCart = await updateCartItems(cartId, id, {
          quantity: 0,
        });

        set((state) => {
          return {
            ...state,
            cartId: updatedCart.id,
            items: state.items.filter((item) => item.id !== id),
          };
        });
      },

      updateQuantity: async (id, quantity) => {
        const { cartId } = get();
        if (!cartId) {
          return;
        }

        const updatedCart = await updateCartItems(cartId, id, {
          quantity: quantity,
        });

        set((state) => ({
          ...state,
          cartId: updatedCart.id,
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      syncWithUser: async () => {
        const { cartId } = get();
        if (!cartId) {
          const cart = await getOrCreateCart();
          set((state) => ({
            ...state,
            cartId: cart.id,
            items: cart.items,
          }));
        }
        const syncedCart = await syncCartWithUser(cartId);
        if (syncedCart) {
          set((state) => ({
            ...state,
            cartId: syncedCart.id,
            items: syncedCart.items,
          }));
        }
      },

      clearCart: () => {
        set((state) => ({ ...state, items: [] }));
      },

      open: () => {
        set((state) => ({ ...state, isOpen: true }));
      },
      close: () => {
        set((state) => ({ ...state, isOpen: false }));
      },

      setIsLoading: (loaded) => {
        set((state) => ({ ...state, isLoading: loaded }));
      },

      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },
      getTotalPrice: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage",
      skipHydration: true,
    }
  )
);
