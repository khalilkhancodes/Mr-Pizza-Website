'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, MenuItem } from '@/types';
import { calculateItemTotal } from '@/content/menu';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: MenuItem, quantity?: number, selectedOptions?: Record<string, string>, note?: string) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  updateNote: (cartItemId: string, note: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getSubtotal: () => number;
  getItemCount: () => number;
  getItems: () => CartItem[];
}

const CART_STORAGE_KEY = 'mrpizza-cart';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (menuItem, quantity = 1, selectedOptions = {}, note) => {
        const optionPrices: Record<string, number> = {};
        let itemPrice = menuItem.price;

        if (menuItem.options) {
          for (const option of menuItem.options) {
            const choiceId = selectedOptions[option.id];
            if (choiceId) {
              const choice = option.choices.find(c => c.id === choiceId);
              if (choice) {
                optionPrices[option.id] = choice.priceDelta;
                itemPrice += choice.priceDelta;
              }
            } else if (option.required) {
              const defaultChoice = option.choices.find(c => c.default);
              if (defaultChoice) {
                optionPrices[option.id] = defaultChoice.priceDelta;
                itemPrice += defaultChoice.priceDelta;
              }
            }
          }
        }

        const cartItemId = `${menuItem.id}-${JSON.stringify(selectedOptions)}`;

        set(state => {
          const existingIndex = state.items.findIndex(item => item.id === cartItemId);
          if (existingIndex >= 0) {
            const newItems = [...state.items];
            newItems[existingIndex].quantity += quantity;
            return { items: newItems, isOpen: true };
          }

          const newItem: CartItem = {
            id: cartItemId,
            menuItemId: menuItem.id,
            name: menuItem.name,
            price: itemPrice,
            image: menuItem.image,
            quantity,
            selectedOptions,
            optionPrices,
            note,
          };

          return { items: [...state.items, newItem], isOpen: true };
        });
      },

      removeItem: (cartItemId) => {
        set(state => ({
          items: state.items.filter(item => item.id !== cartItemId),
        }));
      },

      updateQuantity: (cartItemId, quantity) => {
        if (quantity < 1) {
          get().removeItem(cartItemId);
          return;
        }
        set(state => ({
          items: state.items.map(item =>
            item.id === cartItemId ? { ...item, quantity } : item
          ),
        }));
      },

      updateNote: (cartItemId, note) => {
        set(state => ({
          items: state.items.map(item =>
            item.id === cartItemId ? { ...item, note } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set(state => ({ isOpen: !state.isOpen }));
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getItems: () => {
        return get().items;
      },
    }),
    {
      name: CART_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        // Ensure state is ready after hydration
        if (state) {
          // State is now hydrated
        }
      },
    }
  )
);