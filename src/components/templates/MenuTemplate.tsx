'use client';

import React from 'react';
import { useComandaStore } from '@/store/useComandaStore';
import { HeaderNavbar } from '@/components/organisms/HeaderNavbar';
import { DishCard } from '@/components/organisms/DishCard';
import { FullViewportViewer } from '@/components/organisms/FullViewportViewer';
import { CartDrawer } from '@/components/organisms/CartDrawer';
import { Box, Leaf, ShoppingBag } from 'lucide-react';

interface MenuTemplateProps {
  onBackToWelcome?: () => void;
}

export const MenuTemplate: React.FC<MenuTemplateProps> = ({ onBackToWelcome }) => {
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

  const filteredDishes = dishes.filter((dish) => {
    if (!dish.isAvailable) return false;
    if (selectedCategory !== 'todos' && dish.category !== selectedCategory) return false;
    if (only3D && !dish.model3dUrl) return false;
    if (onlyVeg && !dish.dietary.vegetarian && !dish.dietary.vegan) return false;
    return true;
  });

  const categories = [
    { id: 'todos', label: 'TODA LA CARTA' },
    { id: 'entrantes', label: 'ENTRANTES' },
    { id: 'principales', label: 'PRINCIPALES' },
    { id: 'postres', label: 'DULCES' },
    { id: 'bebidas', label: 'BODEGA & CAVA' },
  ];

  return (
    <div className="min-h-screen bg-[#08090A] text-[#F4F4F5] flex flex-col selection:bg-[#E5C378] selection:text-[#08090A] pb-32">
      <HeaderNavbar
        config={config}
        cartCount={totalCartCount}
        onOpenCart={openCart}
        onToggleAdmin={() => setAdminView(true)}
        onBackToWelcome={onBackToWelcome}
      />

      {/* Hero Editorial Minimalista */}
      <section className="relative px-4 sm:px-8 pt-7 pb-5 border-b border-white/[0.06] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#121519]/50 via-[#08090A] to-[#08090A] overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#F4F4F5] font-display uppercase leading-tight">
                CARTA DE TEMPORADA
              </h2>
            </div>
            <p className="text-xs text-[#9FA4AD] max-w-sm sm:text-right leading-relaxed font-normal">
              Visualice las texturas, cromatismo y escala exacta de cada creación sobre su mesa antes de solicitarlo.
            </p>
          </div>
        </div>
      </section>

      {/* Pestañas de Navegación Editorial & Filtros Rectangulares */}
      <section className="sticky top-[59px] z-30 bg-[#08090A]/95 backdrop-blur-xl border-b border-white/[0.06] px-4 sm:px-8 py-3">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
          {/* Pestañas con micro-subrayado arquitectónico */}
          <nav className="flex items-center gap-6 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative py-1.5 text-xs font-bold tracking-[0.15em] uppercase transition-all whitespace-nowrap cursor-pointer ${
                    isActive ? 'text-[#E5C378]' : 'text-[#9FA4AD] hover:text-[#F4F4F5]'
                  }`}
                >
                  {cat.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#E5C378] shadow-[0_0_10px_rgba(229,195,120,0.5)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Filtros Rectangulares Biselados (6px) */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 scrollbar-none">
            <button
              onClick={() => setOnly3D(!only3D)}
              className={`h-8 px-3 rounded-[6px] text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                only3D
                  ? 'bg-[#E5C378] text-[#08090A] shadow-[0_0_15px_rgba(229,195,120,0.25)]'
                  : 'bg-[#0D0F12] hover:bg-[#121519] text-[#9FA4AD] border border-white/[0.08]'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>AR VIEW 1:1</span>
            </button>
            <button
              onClick={() => setOnlyVeg(!onlyVeg)}
              className={`h-8 px-3 rounded-[6px] text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                onlyVeg
                  ? 'bg-[#E5C378] text-[#08090A] shadow-[0_0_15px_rgba(229,195,120,0.25)]'
                  : 'bg-[#0D0F12] hover:bg-[#121519] text-[#9FA4AD] border border-white/[0.08]'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              <span>PLANT-BASED</span>
            </button>
          </div>
        </div>
      </section>

      {/* Grid de Platos */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 w-full flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              onOpenViewer={openViewer}
              onQuickAdd={(item) => addToCart(item, 1)}
            />
          ))}
        </div>
      </main>

      {/* Floating Comanda Button para móvil */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-5 left-4 right-4 sm:hidden z-30">
          <button
            onClick={openCart}
            className="w-full h-14 rounded-[6px] bg-[#E5C378] text-[#08090A] font-bold text-xs tracking-[0.18em] uppercase flex items-center justify-between px-5 shadow-[0_10px_30px_rgba(229,195,120,0.25)] active:scale-[0.98] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
              <span>VER COMANDA ({totalCartCount})</span>
            </div>
            <span className="font-mono text-sm tabular-nums">
              {cart.reduce((acc, curr) => acc + curr.dish.price * curr.quantity, 0).toFixed(2)} € →
            </span>
          </button>
        </div>
      )}

      {/* Visor Inmersivo Full-Viewport (100dvh) */}
      <FullViewportViewer
        dish={activeViewerDish}
        onClose={closeViewer}
        onAddToCart={addToCart}
      />

      {/* Drawer Comanda */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
        cart={cart}
        tableNumber={config.tableNumber}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onConfirmOrder={() => {
          alert('¡Comanda consolidada enviada a cocina! Su mesero se acercará a la mesa en breve.');
          clearCart();
          closeCart();
        }}
      />
    </div>
  );
};
