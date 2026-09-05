'use client';

import React from 'react';
import { Dish } from '@/types/menu';
import { Plus, Box } from 'lucide-react';

interface DishCardProps {
  dish: Dish;
  onOpenViewer: (dish: Dish) => void;
  onQuickAdd: (dish: Dish) => void;
}

export const DishCard: React.FC<DishCardProps> = ({ dish, onOpenViewer, onQuickAdd }) => {
  return (
    <div className="group relative rounded-[14px] bg-[#0D0F12] border border-white/[0.06] hover:border-[#E5C378]/40 overflow-hidden transition-all duration-300 hover:shadow-[0_12px_35px_rgba(0,0,0,0.8)] flex flex-col justify-between">
      {/* Visual Header con viñeta de alta costura */}
      <div
        onClick={() => onOpenViewer(dish)}
        className="relative h-48 sm:h-52 w-full overflow-hidden cursor-pointer"
      >
        <img
          src={dish.imageUrl}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F12] via-[#0D0F12]/20 to-transparent" />

        {/* Badges superiores discretos y elegantes */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5">
            {dish.model3dUrl && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-[9px] font-bold uppercase tracking-wider bg-[#08090A]/85 text-[#E5C378] border border-[#E5C378]/25 backdrop-blur-md">
                <Box className="w-3 h-3 text-[#E5C378]" />
                <span>3D</span>
              </span>
            )}
            {dish.dietary.chefSpecial && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] text-[9px] font-semibold tracking-wider bg-[#121519]/85 text-[#9FA4AD] border border-white/10 backdrop-blur-md uppercase">
                CHEF SELECCIÓN
              </span>
            )}
          </div>
          <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-mono font-medium bg-[#08090A]/80 text-[#9FA4AD] border border-white/5 backdrop-blur-md">
            {dish.prepTimeMinutes} MIN
          </span>
        </div>

        {/* Dietary badges inferiores */}
        <div className="absolute bottom-3 left-3 flex gap-1.5 pointer-events-none">
          {dish.dietary.vegetarian && (
            <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-medium tracking-wider bg-[#08090A]/80 text-[#9FA4AD] border border-white/5 uppercase">
              PLANT-BASED
            </span>
          )}
          {dish.dietary.glutenFree && (
            <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-medium tracking-wider bg-[#08090A]/80 text-[#9FA4AD] border border-white/5 uppercase">
              SIN GLUTEN
            </span>
          )}
        </div>
      </div>

      {/* Contenido descriptivo */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3
            onClick={() => onOpenViewer(dish)}
            className="text-lg font-bold text-[#F4F4F5] hover:text-[#E5C378] transition-colors cursor-pointer line-clamp-1 font-display"
          >
            {dish.name}
          </h3>
          <p className="text-xs text-[#E5C378]/90 font-medium tracking-wide mt-1 line-clamp-1">
            {dish.tagline}
          </p>
          <p className="text-xs text-[#9FA4AD] line-clamp-2 leading-relaxed mt-2 font-normal">
            {dish.description}
          </p>
        </div>

        {/* Footer Card */}
        <div className="pt-3 mt-4 border-t border-white/[0.06] flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-base sm:text-lg font-bold text-[#E5C378] font-mono tabular-nums tracking-tight">
              {dish.price.toFixed(2)} €
            </span>
          </div>

          <div className="flex items-center gap-2">
            {dish.model3dUrl && (
              <button
                onClick={() => onOpenViewer(dish)}
                className="h-9 px-3.5 rounded-[6px] text-[11px] font-bold tracking-widest uppercase bg-[#121519] hover:bg-[#1A1E24] text-[#E5C378] border border-[#E5C378]/30 flex items-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <Box className="w-3.5 h-3.5 text-[#E5C378]" />
                <span className="hidden sm:inline">VER EN MESA</span>
                <span className="sm:hidden">3D</span>
              </button>
            )}
            <button
              onClick={() => onQuickAdd(dish)}
              className="w-9 h-9 rounded-[6px] bg-[#E5C378] hover:bg-[#F0DFA8] text-[#08090A] font-bold shadow-[0_0_15px_rgba(229,195,120,0.2)] transition-all active:scale-95 cursor-pointer flex items-center justify-center"
              aria-label="Añadir a la comanda"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
