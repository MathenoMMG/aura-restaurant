'use client';

import React from 'react';
import { RestaurantConfig } from '@/types/menu';
import { Settings, ShoppingBag } from 'lucide-react';

interface HeaderNavbarProps {
  config: RestaurantConfig;
  cartCount: number;
  onOpenCart: () => void;
  onToggleAdmin: () => void;
  onBackToWelcome?: () => void;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  config,
  cartCount,
  onOpenCart,
  onToggleAdmin,
  onBackToWelcome,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#08090A]/90 backdrop-blur-xl border-b border-white/[0.06] px-4 sm:px-8 py-3.5 flex items-center justify-between">
      {/* Brand & Table Status */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBackToWelcome}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
        >
          <div className="w-8 h-8 rounded-[6px] bg-[#121519] border border-[#E5C378]/30 flex items-center justify-center text-[#E5C378] font-display font-bold text-xs shadow-[0_0_15px_rgba(229,195,120,0.15)] group-hover:border-[#E5C378] transition-colors">
            A
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-[0.2em] text-[#F4F4F5] uppercase font-display group-hover:text-[#E5C378] transition-colors">
                {config.name}
              </span>
              <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-semibold tracking-widest bg-[#121519] text-[#E5C378] border border-[#E5C378]/20 font-mono">
                {config.tableNumber}
              </span>
            </div>
          </div>
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onToggleAdmin}
          className="h-9 px-3 rounded-[6px] bg-[#121519] hover:bg-[#1A1E24] text-[#9FA4AD] hover:text-white border border-white/[0.08] text-[11px] font-semibold tracking-wider uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
          title="Panel de Gestión"
        >
          <Settings className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">ADMIN</span>
        </button>

        <button
          onClick={onOpenCart}
          className="h-9 px-3.5 rounded-[6px] bg-[#E5C378] hover:bg-[#F0DFA8] text-[#08090A] font-bold text-xs tracking-wider uppercase flex items-center gap-2 shadow-[0_0_20px_rgba(229,195,120,0.2)] transition-transform active:scale-95 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
          <span className="hidden sm:inline">COMANDA</span>
          {cartCount > 0 && (
            <span className="min-w-[18px] h-[18px] px-1 rounded-[4px] bg-[#08090A] text-[#E5C378] text-[10px] flex items-center justify-center font-bold font-mono">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
