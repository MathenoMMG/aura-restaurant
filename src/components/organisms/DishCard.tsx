"use client";

import React from "react";
import { Dish } from "@/types/menu";
import { Plus } from "lucide-react";

interface DishCardProps {
  dish: Dish;
  onOpenViewer: (dish: Dish) => void;
  onQuickAdd: (dish: Dish) => void;
}

/**
 * Entrada de la carta.
 *
 * No es una tarjeta: sin fondo, sin borde y sin radio, separada por un filete
 * como en una carta impresa. Los datos secundarios —gramaje, dieta, 3D— van
 * en una sola línea monoespaciada en lugar de en pastillas sueltas, que era
 * lo que llenaba la pantalla de ruido.
 */
export const DishCard: React.FC<DishCardProps> = ({
  dish,
  onOpenViewer,
  onQuickAdd,
}) => {
  const meta = [
    dish.portionWeight,
    dish.dietary.vegan
      ? "Vegano"
      : dish.dietary.vegetarian
        ? "Vegetariano"
        : null,
    dish.dietary.glutenFree ? "Sin gluten" : null,
    dish.model3dUrl ? "Vista 3D" : null,
  ].filter(Boolean);

  return (
    <article className="flex flex-col border-t border-[#F2EFE9]/10 pt-5">
      <button
        onClick={() => onOpenViewer(dish)}
        className="group relative mb-4 aspect-[4/3] w-full cursor-pointer overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8845F]"
        aria-label={`Ver ${dish.name}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={dish.imageUrl}
          alt={dish.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </button>

      <div className="flex items-baseline justify-between gap-4">
        <h3
          onClick={() => onOpenViewer(dish)}
          className="cursor-pointer font-condensed text-[21px] font-semibold uppercase leading-[1.05] tracking-[0.005em] text-[#F2EFE9] transition-colors hover:text-[#B8845F]"
        >
          {dish.name}
        </h3>
        <span className="font-tech text-[14px] tabular-nums text-[#F2EFE9]">
          {dish.price.toFixed(2)} €
        </span>
      </div>

      <p className="mt-1.5 text-[12.5px] leading-[1.5] text-[#8A867E]">
        {dish.tagline}
      </p>

      <div className="mt-3 flex items-center justify-between gap-4">
        <span className="font-tech text-[9px] tracking-[0.14em] text-[#5C5952]">
          {meta.join(" · ")}
        </span>

        <button
          onClick={() => onQuickAdd(dish)}
          className="flex cursor-pointer items-center gap-1.5 font-tech text-[9px] uppercase tracking-[0.16em] text-[#B8845F] transition-colors hover:text-[#F2EFE9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8845F]"
          aria-label={`Añadir ${dish.name} al pedido`}
        >
          <Plus className="h-3 w-3 stroke-[2]" />
          <span>Añadir</span>
        </button>
      </div>
    </article>
  );
};
