import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Dish, ComandaItem, RestaurantConfig } from '@/types/menu';
import { INITIAL_DISHES, DEFAULT_RESTAURANT_CONFIG } from '@/data/menuData';

interface ComandaState {
  config: RestaurantConfig;
  dishes: Dish[];
  cart: ComandaItem[];
  activeViewerDish: Dish | null;
  isCartOpen: boolean;
  isAdminView: boolean;
  selectedCategory: string;
  only3D: boolean;
  onlyVeg: boolean;
  
  // Actions
  setConfig: (config: RestaurantConfig) => void;
  setSelectedCategory: (cat: string) => void;
  setOnly3D: (val: boolean) => void;
  setOnlyVeg: (val: boolean) => void;
  openViewer: (dish: Dish) => void;
  closeViewer: () => void;
  openCart: () => void;
  closeCart: () => void;
  setAdminView: (val: boolean) => void;
  
  addToCart: (dish: Dish, quantity?: number, notes?: string) => void;
  updateQuantity: (dishId: string, delta: number) => void;
  removeItem: (dishId: string) => void;
  clearCart: () => void;
  toggleAvailability: (dishId: string) => void;
}

export const useComandaStore = create<ComandaState>()(
  persist(
    (set, get) => ({
      config: DEFAULT_RESTAURANT_CONFIG,
      dishes: INITIAL_DISHES,
      cart: [],
      activeViewerDish: null,
      isCartOpen: false,
      isAdminView: false,
      selectedCategory: 'todos',
      only3D: false,
      onlyVeg: false,

      setConfig: (config) => set({ config }),
      setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
      setOnly3D: (only3D) => set({ only3D }),
      setOnlyVeg: (onlyVeg) => set({ onlyVeg }),
      openViewer: (activeViewerDish) => {
        // Incrementar vistas 3d en el plato
        set((state) => ({
          activeViewerDish,
          dishes: state.dishes.map((d) =>
            d.id === activeViewerDish.id ? { ...d, views3dCount: d.views3dCount + 1 } : d
          ),
        }));
      },
      closeViewer: () => set({ activeViewerDish: null }),
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      setAdminView: (isAdminView) => set({ isAdminView }),

      addToCart: (dish, quantity = 1, notes = '') => {
        set((state) => {
          const existingIndex = state.cart.findIndex((c) => c.dish.id === dish.id);
          let newCart: ComandaItem[];
          if (existingIndex > -1) {
            newCart = state.cart.map((item, idx) =>
              idx === existingIndex
                ? { ...item, quantity: item.quantity + quantity, notes: notes || item.notes }
                : item
            );
          } else {
            newCart = [...state.cart, { dish, quantity, notes }];
          }

          // Aumentar contador de órdenes en el plato
          const updatedDishes = state.dishes.map((d) =>
            d.id === dish.id ? { ...d, ordersCount: d.ordersCount + quantity } : d
          );

          return { cart: newCart, dishes: updatedDishes };
        });
      },

      updateQuantity: (dishId, delta) => {
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.dish.id === dishId ? { ...item, quantity: item.quantity + delta } : item
            )
            .filter((item) => item.quantity > 0),
        }));
      },

      removeItem: (dishId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.dish.id !== dishId),
        }));
      },

      clearCart: () => set({ cart: [] }),

      toggleAvailability: (dishId) => {
        set((state) => ({
          dishes: state.dishes.map((d) =>
            d.id === dishId ? { ...d, isAvailable: !d.isAvailable } : d
          ),
        }));
      },
    }),
    {
      name: 'aura-comanda-storage',
      partialize: (state) => ({ cart: state.cart, config: state.config }),
    }
  )
);
