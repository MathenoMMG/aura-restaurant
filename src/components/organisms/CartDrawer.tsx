'use client';

import React from 'react';
import { ComandaItem } from '@/types/menu';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: ComandaItem[];
  tableNumber: string;
  onUpdateQuantity: (dishId: string, delta: number) => void;
  onRemoveItem: (dishId: string) => void;
  onConfirmOrder: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  tableNumber,
  onUpdateQuantity,
  onRemoveItem,
  onConfirmOrder,
}) => {
  if (!isOpen) return null;

  const total = cart.reduce((acc, curr) => acc + curr.dish.price * curr.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md h-full bg-[#08090A] border-l border-white/[0.08] p-5 sm:p-6 flex flex-col justify-between text-[#F4F4F5] shadow-2xl">
        <div>
          {/* Header del Drawer */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4 text-[#E5C378]" />
              <h2 className="text-sm font-bold tracking-[0.18em] uppercase font-display text-[#F4F4F5]">
                Comanda de Mesa
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-[4px] text-[10px] font-bold font-mono tracking-wider bg-[#121519] border border-[#E5C378]/25 text-[#E5C378]">
                {tableNumber}
              </span>
              <button
                onClick={onClose}
                className="p-1.5 rounded-[6px] bg-[#121519] hover:bg-[#1A1E24] text-[#9FA4AD] hover:text-[#F4F4F5] border border-white/[0.08] transition-colors cursor-pointer"
                aria-label="Cerrar comanda"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Lista de Items */}
          <div className="mt-4 max-h-[62vh] overflow-y-auto space-y-3 pr-1 scrollbar-none">
            {cart.length === 0 ? (
              <div className="text-center py-20 text-[#9FA4AD] flex flex-col items-center gap-3">
                <ShoppingBag className="w-10 h-10 text-[#9FA4AD]/40 stroke-1" />
                <p className="text-xs tracking-wide">No ha añadido ningún plato a la comanda aún.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.dish.id}
                  className="p-3.5 rounded-[8px] bg-[#0D0F12] border border-white/[0.06] flex items-center justify-between gap-3"
                >
                  <img
                    src={item.dish.imageUrl}
                    alt={item.dish.name}
                    className="w-13 h-13 rounded-[6px] object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[#F4F4F5] font-display uppercase truncate">
                      {item.dish.name}
                    </h4>
                    <span className="text-xs font-bold text-[#E5C378] font-mono tabular-nums">
                      {(item.dish.price * item.quantity).toFixed(2)} €
                    </span>
                    {item.notes && (
                      <p className="text-[10px] text-[#9FA4AD] italic truncate mt-0.5">
                        &quot;{item.notes}&quot;
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-[#08090A] border border-white/[0.08] rounded-[6px] px-1.5 py-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.dish.id, -1)}
                        className="text-[#9FA4AD] hover:text-[#F4F4F5] p-1 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-5 text-center font-mono text-[#F4F4F5]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.dish.id, 1)}
                        className="text-[#9FA4AD] hover:text-[#F4F4F5] p-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.dish.id)}
                      className="p-1 text-[#9FA4AD] hover:text-red-400 transition-colors cursor-pointer"
                      title="Eliminar"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer del Drawer con Total y Botón */}
        {cart.length > 0 && (
          <div className="pt-4 border-t border-white/[0.06] space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-semibold tracking-wider text-[#9FA4AD] uppercase">
                TOTAL COMANDA
              </span>
              <span className="text-2xl font-bold text-[#E5C378] font-mono tabular-nums">
                {total.toFixed(2)} €
              </span>
            </div>

            <button
              onClick={onConfirmOrder}
              className="w-full h-14 rounded-[6px] bg-[#E5C378] hover:bg-[#F0DFA8] text-[#08090A] font-bold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(229,195,120,0.25)] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>CONFIRMAR COMANDA A COCINA</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
            <p className="text-[10px] text-center text-[#9FA4AD] font-medium tracking-wide">
              Su orden se consolidará y enviará directamente al pase de cocina.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
