import { create } from 'zustand';
import { supabase } from './supabase';

interface CartItem {
  id: string;
  domain_name: string;
  extension: string;
  price: number;
}

interface UserState {
  user: any;
  cart: CartItem[];
  setUser: (user: any) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useStore = create<UserState>((set) => ({
  user: null,
  cart: [],
  setUser: (user) => set({ user }),
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== id),
  })),
  clearCart: () => set({ cart: [] }),
}));

// Initialize auth state
supabase.auth.getSession().then(({ data: { session } }) => {
  useStore.getState().setUser(session?.user ?? null);
});

// Listen for auth changes
supabase.auth.onAuthStateChange((_event, session) => {
  useStore.getState().setUser(session?.user ?? null);
});