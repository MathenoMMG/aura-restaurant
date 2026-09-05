export type DietaryFlag =
  | "vegetarian"
  | "vegan"
  | "glutenFree"
  | "containsNuts"
  | "chefSpecial"
  | "signature";

export interface DishModifier {
  id: string;
  name: string;
  priceDelta: number;
}

export interface Dish {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  category: string;
  portionWeight?: string; // Ej: "320g", "450ml"
  prepTimeMinutes: number;
  dietary: Partial<Record<DietaryFlag, boolean>>;
  ingredients: string[];
  pairing?: string;
  sommelierPairing?: string;
  originStory?: string;
  model3dUrl?: string;
  usdzUrl?: string;
  /** Atribución del modelo 3D. Obligatoria con licencias CC BY. */
  modelCredit?: string;
  imageUrl: string;
  /** Fotos adicionales del plato. La primera del visor es siempre imageUrl. */
  gallery?: string[];
  isAvailable: boolean;
  views3dCount: number;
  ordersCount: number;
}

export interface ComandaItem {
  dish: Dish;
  quantity: number;
  notes?: string;
  selectedModifiers?: DishModifier[];
}

export interface RestaurantConfig {
  id: string;
  name: string;
  tagline: string;
  currencySymbol: string;
  tableNumber: string;
  primaryAccent: string;
}
