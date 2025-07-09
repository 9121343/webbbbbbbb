import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  items: [],
  addItem: (product) => {
    const items = get().items;
    const existingItem = items.find((item) => item.id === product.id);

    if (existingItem) {
      set({
        items: items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      });
    } else {
      set({ items: [...items, { ...product, quantity: 1 }] });
    }
  },
  removeItem: (productId) => {
    set({ items: get().items.filter((item) => item.id !== productId) });
  },
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    set({
      items: get().items.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    });
  },
  clearCart: () => set({ items: [] }),
  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  },
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
}));

export const useUserStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  login: (userData) => set({ user: userData, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  updateUser: (userData) => set({ user: userData }),
}));

export const useProductStore = create((set) => ({
  products: [],
  categories: [
    { id: "men-clothing", name: "Men's Clothing", icon: "👔" },
    { id: "women-clothing", name: "Women's Clothing", icon: "👗" },
    { id: "kids-clothing", name: "Kids' Clothing", icon: "👶" },
    { id: "shoes", name: "Shoes", icon: "👟" },
    { id: "watches", name: "Watches", icon: "⌚" },
    { id: "perfumes", name: "Perfumes", icon: "💐" },
    { id: "accessories", name: "Accessories", icon: "👜" },
  ],
  setProducts: (products) => set({ products }),
  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
}));
