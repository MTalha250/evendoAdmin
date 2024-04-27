import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],
  addToCart: (item:any) => set((state:any) => ({ cart: [...state.cart, item] })),
  removeFromCart: (item:any) => set((state:any) => ({ cart: state.cart.filter((i:any) => i._id !== item._id) })),
  clearCart: () => set({ cart: [] }),
}));