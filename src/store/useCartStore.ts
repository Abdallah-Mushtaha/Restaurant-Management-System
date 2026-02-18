import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create()(
  persist(
    (set, get: any) => ({
      cartItems: [],
      addToCart: (product: any, guestId: string) => {
        const items = get().cartItems;
        const existing = items.find((i: any) => i.id === product.id && i.guestId === guestId);
        if (existing) {
          set({
            cartItems: items.map((i: any) =>
              (i.id === product.id && i.guestId === guestId) ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ cartItems: [...items, { ...product, quantity: 1, guestId }] });
        }
      },
      removeFromCart: (id: string, guestId: string) => 
        set({ cartItems: get().cartItems.filter((i: any) => !(i.id === id && i.guestId === guestId)) }),
      
      updateQuantity: (id: string, delta: number, guestId: string) => {
        set({
          cartItems: get().cartItems.map((i: any) =>
            (i.id === id && i.guestId === guestId) ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
          ),
        });
      },

      clearGuestCart: (guestId: string) => {
        set({
          cartItems: get().cartItems.filter((i: any) => i.guestId !== guestId)
        });
      },

      getGuestItems: (guestId: string) => get().cartItems.filter((i: any) => i.guestId === guestId),
      getTotalPrice: (guestId: string) => 
        get().cartItems.filter((i: any) => i.guestId === guestId).reduce((s: number, i: any) => s + i.price * i.quantity, 0),
      getTotalItems: (guestId: string) => 
        get().cartItems.filter((i: any) => i.guestId === guestId).reduce((s: number, i: any) => s + i.quantity, 0),
    }),
    { name: 'cart-storage' }
  )
);