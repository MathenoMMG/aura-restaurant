"use client";

import React from "react";
import { RestaurantConfig } from "@/types/menu";
import { ShoppingBag } from "lucide-react";

interface HeaderNavbarProps {
  config: RestaurantConfig;
  cartCount: number;
  onOpenCart: () => void;
  onToggleAdmin: () => void;
  onBackToWelcome?: () => void;
}

/**
 * Barra de la carta.
 *
 * Sin marca gráfica: esto es una carta, no la home del restaurante, así que
 * el nombre va en tipografía y punto. El acceso a gestión queda como texto
 * discreto — no debería competir con nada de lo que el comensal vino a hacer.
 */
export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  config,
  cartCount,
  onOpenCart,
  onToggleAdmin,
  onBackToWelcome,
}) => (
  <header className="flex items-baseline justify-between gap-4 border-b border-[#F2EFE9]/10 px-5 py-3.5 sm:px-8">
    <div className="flex items-baseline gap-3">
      <button
        onClick={onBackToWelcome}
        className="cursor-pointer font-condensed text-[15px] font-semibold uppercase tracking-[0.36em] text-[#F2EFE9] transition-colors hover:text-[#B8845F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8845F]"
      >
        {config.name.split(" ")[0]}
      </button>
      <span className="font-tech text-[9px] uppercase tracking-[0.22em] text-[#5C5952]">
        {config.tableNumber}
      </span>
    </div>

    <div className="flex items-baseline gap-5">
      <button
        onClick={onToggleAdmin}
        className="cursor-pointer font-tech text-[9px] uppercase tracking-[0.22em] text-[#5C5952] transition-colors hover:text-[#8A867E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8845F]"
      >
        Gestión
      </button>

      <button
        onClick={onOpenCart}
        className="flex cursor-pointer items-center gap-2 font-condensed text-[13px] font-semibold uppercase tracking-[0.2em] text-[#F2EFE9] transition-colors hover:text-[#B8845F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8845F]"
      >
        <ShoppingBag className="h-4 w-4 stroke-[1.6]" />
        <span>Pedido</span>
        {cartCount > 0 && (
          <span className="font-tech text-[11px] tabular-nums text-[#B8845F]">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  </header>
);
