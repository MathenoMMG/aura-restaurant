import { Dish, RestaurantConfig } from "@/types/menu";

export const DEFAULT_RESTAURANT_CONFIG: RestaurantConfig = {
  id: "rest-aura-01",
  name: "AURA Gastronomique",
  tagline: "Experiencia Culinaria Sensorial & WebAR",
  currencySymbol: "€",
  tableNumber: "Mesa 14",
  primaryAccent: "#F59E0B",
};

export const INITIAL_DISHES: Dish[] = [
  {
    id: "dish-01",
    name: "Wagyu A5 Glaseado al Oporto",
    tagline: "Corte premium sellado a la brasa con microbrotes",
    description:
      "Medallón de lomo Wagyu grado A5 con glaseado de vino de Oporto envejecido, emulsión de tuétano ahumado, microbrotes y láminas de papa trufada.",
    price: 48,
    category: "principales",
    portionWeight: "320g",
    prepTimeMinutes: 22,
    dietary: { glutenFree: true, signature: true, chefSpecial: true },
    ingredients: [
      "Wagyu A5",
      "Reducción de Oporto",
      "Trufa Melanosporum",
      "Tuétano",
    ],
    pairing: "Malbec Gran Reserva 2018",
    imageUrl:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80&crop=focalpoint&fp-x=0.40&fp-y=0.45&fp-z=1.7",
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80&crop=focalpoint&fp-x=0.62&fp-y=0.58&fp-z=1.4",
    ],
    model3dUrl: "/models/wagyu-fiorentina.glb",
    modelCredit: "Modelo 3D: “Florence Steak” de Shahriar Shahrabi (CC BY)",
    isAvailable: true,
    views3dCount: 430,
    ordersCount: 112,
  },
  {
    id: "dish-02",
    name: "Risotto de Setas Silvestres y Trufa",
    tagline: "Cremoso Acquerello con boletus y parmesano 36 meses",
    description:
      "Arroz envejecido mantecado en caldo clarificado de bosque, boletus edulis salteados con tomillo fresco, lascas de Reggiano y aceite infusionado en trufa blanca.",
    price: 32,
    category: "principales",
    portionWeight: "380g",
    prepTimeMinutes: 18,
    dietary: { vegetarian: true, glutenFree: true },
    ingredients: [
      "Arroz Acquerello",
      "Boletus Edulis",
      "Parmesano 36m",
      "Trufa blanca",
    ],
    pairing: "Chardonnay Fermentado en Barrica",
    imageUrl:
      "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80&crop=focalpoint&fp-x=0.40&fp-y=0.45&fp-z=1.7",
      "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80&crop=focalpoint&fp-x=0.62&fp-y=0.58&fp-z=1.4",
    ],
    isAvailable: true,
    views3dCount: 320,
    ordersCount: 88,
  },
  {
    id: "dish-03",
    name: "Tártaro de Atún Rojo Balfegó",
    tagline: "Atún de almadraba con perlas de yuzu y sésamo negro",
    description:
      "Lomo de atún rojo picado a cuchillo, vinagreta ligera de sésamo tostado, emulsión de aguacate Hass, alga nori deshidratada y caviar cítrico.",
    price: 36,
    category: "entrantes",
    portionWeight: "240g",
    prepTimeMinutes: 14,
    dietary: { glutenFree: true, chefSpecial: true },
    ingredients: ["Atún Balfegó", "Caviar cítrico", "Yuzu", "Aguacate"],
    pairing: "Champagne Brut Nature",
    imageUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80&crop=focalpoint&fp-x=0.40&fp-y=0.45&fp-z=1.7",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80&crop=focalpoint&fp-x=0.62&fp-y=0.58&fp-z=1.4",
    ],
    isAvailable: true,
    views3dCount: 520,
    ordersCount: 140,
  },
  {
    id: "dish-04",
    name: "Carpaccio de Remolacha & Queso de Cabra",
    tagline: "Macerado en cítricos con pistacho tostado de Bronte",
    description:
      "Láminas finas de remolacha ecológica a baja temperatura, medallones caramelizados de queso Sainte-Maure y miel de lavanda silvestre.",
    price: 24,
    category: "entrantes",
    portionWeight: "200g",
    prepTimeMinutes: 12,
    dietary: { vegetarian: true, glutenFree: true, containsNuts: true },
    ingredients: [
      "Remolacha ecológica",
      "Queso Sainte-Maure",
      "Pistacho de Bronte",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80&crop=focalpoint&fp-x=0.40&fp-y=0.45&fp-z=1.7",
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80&crop=focalpoint&fp-x=0.62&fp-y=0.58&fp-z=1.4",
    ],
    isAvailable: true,
    views3dCount: 190,
    ordersCount: 48,
  },
  {
    id: "dish-05",
    name: "Esfera de Cacao 72% Humo de Roble",
    tagline: "Cacao de origen con corazón líquido de caramelo salado",
    description:
      "Esfera crujiente de chocolate Valrhona rellena de mousse de café arábica, corazón fundente de toffee artesanal ahumado en mesa con virutas de barrica.",
    price: 19,
    category: "postres",
    portionWeight: "180g",
    prepTimeMinutes: 15,
    dietary: { vegetarian: true, chefSpecial: true },
    ingredients: ["Chocolate Valrhona 72%", "Café arábica", "Sal de Maldon"],
    imageUrl:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80&crop=focalpoint&fp-x=0.40&fp-y=0.45&fp-z=1.7",
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80&crop=focalpoint&fp-x=0.62&fp-y=0.58&fp-z=1.4",
    ],
    isAvailable: true,
    views3dCount: 660,
    ordersCount: 205,
  },
  {
    id: "dish-06",
    name: "Cóctel Nebulosa de Romero y Saúco",
    tagline: "Destilado botánico artesanal y burbuja aromática",
    description:
      "Gin botánico infusionado con romero, licor St-Germain de flor de saúco, tónica artesanal y coronado con burbuja de humo aromático que se disuelve en mesa.",
    price: 18,
    category: "bebidas",
    portionWeight: "250ml",
    prepTimeMinutes: 8,
    dietary: { vegan: true, glutenFree: true },
    ingredients: [
      "Gin botánico",
      "Licor St-Germain",
      "Romero silvestre",
      "Burbuja aromática",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80&crop=focalpoint&fp-x=0.40&fp-y=0.45&fp-z=1.7",
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80&crop=focalpoint&fp-x=0.62&fp-y=0.58&fp-z=1.4",
    ],
    model3dUrl:
      "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/WaterBottle/glTF-Binary/WaterBottle.glb",
    isAvailable: true,
    views3dCount: 310,
    ordersCount: 124,
  },
];
