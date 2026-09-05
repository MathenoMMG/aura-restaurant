"use client";

import React from "react";
import { useComandaStore } from "@/store/useComandaStore";
import { HeaderNavbar } from "@/components/organisms/HeaderNavbar";
import { DishCard } from "@/components/organisms/DishCard";
import { FullViewportViewer } from "@/components/organisms/FullViewportViewer";
import { CartDrawer } from "@/components/organisms/CartDrawer";

interface MenuTemplateProps {
  onBackToWelcome?: () => void;
}

const CATEGORIES = [
  { id: "todos", label: "Todo" },
  { id: "entrantes", label: "Entrantes" },
  { id: "principales", label: "Principales" },
  { id: "postres", label: "Dulces" },
  { id: "bebidas", label: "Bodega" },
];

/**
 * Carta.
 *
 * Se eliminó el hero ("CARTA DE TEMPORADA" y el párrafo sobre texturas y
 * escala): ocupaba el primer tercio de la pantalla para no ayudar a elegir
 * nada. Las categorías pasan a ser lo primero que se ve.
 */
export const MenuTemplate: React.FC<MenuTemplateProps> = ({
  onBackToWelcome,
}) => {
  const {
    config,
    dishes,
    cart,
    selectedCategory,
    only3D,
    onlyVeg,
    activeViewerDish,
    isCartOpen,
    setSelectedCategory,
    setOnly3D,
    setOnlyVeg,
    openViewer,
    closeViewer,
    openCart,
    closeCart,
    setAdminView,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
  } = useComandaStore();

  const totalCartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const cartTotal = cart.reduce(
    (acc, curr) => acc + curr.dish.price * curr.quantity,
    0,
  );

  const filteredDishes = dishes.filter((dish) => {
    if (!dish.isAvailable) return false;
    if (selectedCategory !== "todos" && dish.category !== selectedCategory)
      return false;
    if (only3D && !dish.model3dUrl) return false;
    if (onlyVeg && !dish.dietary.vegetarian && !dish.dietary.vegan)
      return false;
    return true;
  });

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#101010] text-[#F2EFE9] pb-28">
      <div className="sticky top-0 z-30 bg-[#101010]/95 backdrop-blur-xl">
        <HeaderNavbar
          config={config}
          cartCount={totalCartCount}
          onOpenCart={openCart}
          onToggleAdmin={() => setAdminView(true)}
          onBackToWelcome={onBackToWelcome}
        />

        {/* Categorías: lo primero de la pantalla, sin hero por delante */}
        <nav className="scrollbar-none flex gap-6 overflow-x-auto border-b border-[#F2EFE9]/10 px-5 sm:px-8">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative cursor-pointer whitespace-nowrap border-b py-3 font-condensed text-[15px] font-semibold uppercase tracking-[0.14em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#B8845F] ${
                  isActive
                    ? "border-[#B8845F] text-[#F2EFE9]"
                    : "border-transparent text-[#5C5952] hover:text-[#8A867E]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </nav>

        {/* Recuento + filtros como texto conmutable, no como pastillas */}
        <div className="flex items-baseline justify-between gap-4 px-5 py-2.5 font-tech text-[9px] uppercase tracking-[0.16em] sm:px-8">
          <span className="text-[#5C5952] tabular-nums">
            {filteredDishes.length}{" "}
            {filteredDishes.length === 1 ? "plato" : "platos"}
          </span>

          <div className="flex gap-5">
            <FilterToggle
              label="Vista 3D"
              active={only3D}
              onClick={() => setOnly3D(!only3D)}
            />
            <FilterToggle
              label="Vegetariano"
              active={onlyVeg}
              onClick={() => setOnlyVeg(!onlyVeg)}
            />
          </div>
        </div>
      </div>

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 pt-2 sm:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              onOpenViewer={openViewer}
              onQuickAdd={(item) => addToCart(item, 1)}
            />
          ))}
        </div>

        {filteredDishes.length === 0 && (
          <p className="border-t border-[#F2EFE9]/10 pt-6 font-tech text-[11px] text-[#5C5952]">
            No hay platos con estos filtros.
          </p>
        )}
      </main>

      {totalCartCount > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#F2EFE9]/10 bg-[#101010] px-5 py-3 sm:hidden">
          <button
            onClick={openCart}
            className="flex w-full cursor-pointer items-center justify-between bg-[#F2EFE9] px-5 py-3.5 font-condensed text-[13px] font-semibold uppercase tracking-[0.2em] text-[#101010] transition-colors active:bg-[#DDD9D2]"
          >
            <span>Ver pedido ({totalCartCount})</span>
            <span className="font-tech text-[12px] tabular-nums">
              {cartTotal.toFixed(2)} €
            </span>
          </button>
        </div>
      )}

      <FullViewportViewer
        dish={activeViewerDish}
        onClose={closeViewer}
        onAddToCart={addToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
        cart={cart}
        tableNumber={config.tableNumber}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onConfirmOrder={() => {
          alert(
            "Pedido enviado a cocina. Su mesero se acercará a la mesa en breve.",
          );
          clearCart();
          closeCart();
        }}
      />
    </div>
  );
};

const FilterToggle: React.FC<{
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    aria-pressed={active}
    className={`cursor-pointer border-b pb-0.5 uppercase tracking-[0.16em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8845F] ${
      active
        ? "border-[#B8845F] text-[#B8845F]"
        : "border-transparent text-[#5C5952] hover:text-[#8A867E]"
    }`}
  >
    {label}
  </button>
);
