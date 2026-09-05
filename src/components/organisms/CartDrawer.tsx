"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ComandaItem } from "@/types/menu";
import { X, Plus, Minus } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: ComandaItem[];
  tableNumber: string;
  onUpdateQuantity: (dishId: string, delta: number) => void;
  onRemoveItem: (dishId: string) => void;
  onConfirmOrder: () => void;
}

/**
 * Pedido de la mesa.
 *
 * La cabecera repite el formato de la barra de la carta —título a la
 * izquierda, mesa en mono a su lado— para que no parezcan dos pantallas de
 * aplicaciones distintas.
 */
export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  tableNumber,
  onUpdateQuantity,
  onRemoveItem,
  onConfirmOrder,
}) => {
  const total = cart.reduce(
    (acc, curr) => acc + curr.dish.price * curr.quantity,
    0,
  );
  const units = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Pedido de la mesa"
            onClick={(e) => e.stopPropagation()}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.34, ease: [0.22, 0.7, 0.3, 1] }}
            className="flex h-[100dvh] w-full max-w-md flex-col border-l border-[#F2EFE9]/10 bg-[#101010] text-[#F2EFE9]"
          >
            <header className="border-b border-[#F2EFE9]/10 px-5 py-3.5 sm:px-6">
              <div className="flex items-baseline justify-between gap-4">
                <div className="flex items-baseline gap-3">
                  <h2 className="font-condensed text-[15px] font-semibold uppercase tracking-[0.36em]">
                    Pedido
                  </h2>
                  <span className="font-tech text-[9px] uppercase tracking-[0.22em] text-[#5C5952]">
                    {tableNumber}
                  </span>
                </div>

                <button
                  onClick={onClose}
                  aria-label="Cerrar pedido"
                  className="-mr-1 cursor-pointer text-[#8A867E] transition-colors hover:text-[#F2EFE9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8845F]"
                >
                  <X className="h-5 w-5 stroke-[1.5]" />
                </button>
              </div>

              {units > 0 && (
                <p className="mt-1.5 font-tech text-[9px] uppercase tracking-[0.16em] text-[#5C5952] tabular-nums">
                  {units} {units === 1 ? "unidad" : "unidades"}
                </p>
              )}
            </header>

            <div className="scrollbar-none flex-1 overflow-y-auto overscroll-contain px-5 sm:px-6">
              {cart.length === 0 ? (
                <p className="py-20 text-center font-tech text-[11px] leading-[1.8] text-[#5C5952]">
                  Todavía no ha añadido ningún plato.
                </p>
              ) : (
                cart.map((item) => (
                  <article
                    key={item.dish.id}
                    className="flex items-start gap-4 border-b border-[#F2EFE9]/10 py-4"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.dish.imageUrl}
                      alt=""
                      className="h-16 w-16 shrink-0 object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="font-condensed text-[16px] font-semibold uppercase leading-[1.1]">
                        {item.dish.name}
                      </h3>
                      <span className="mt-1 block font-tech text-[13px] tabular-nums text-[#F2EFE9]">
                        {(item.dish.price * item.quantity).toFixed(2)} €
                      </span>
                      {item.notes && (
                        <p className="mt-1 text-[12px] leading-[1.4] text-[#8A867E]">
                          {item.notes}
                        </p>
                      )}

                      <div className="mt-2.5 flex items-center gap-4">
                        <div className="flex items-center border border-[#F2EFE9]/15">
                          <button
                            onClick={() => onUpdateQuantity(item.dish.id, -1)}
                            aria-label="Quitar una unidad"
                            className="cursor-pointer px-2 py-1.5 text-[#8A867E] transition-colors hover:text-[#F2EFE9]"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center font-tech text-[12px] tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.dish.id, 1)}
                            aria-label="Añadir una unidad"
                            className="cursor-pointer px-2 py-1.5 text-[#8A867E] transition-colors hover:text-[#F2EFE9]"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.dish.id)}
                          className="cursor-pointer font-tech text-[9px] uppercase tracking-[0.16em] text-[#5C5952] transition-colors hover:text-[#B8845F]"
                        >
                          Quitar
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <footer
                className="border-t border-[#F2EFE9]/10 px-5 py-4 sm:px-6"
                style={{
                  paddingBottom: "calc(1rem + env(safe-area-inset-bottom))",
                }}
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-tech text-[9px] uppercase tracking-[0.16em] text-[#5C5952]">
                    Total
                  </span>
                  <span className="font-tech text-[22px] tabular-nums text-[#F2EFE9]">
                    {total.toFixed(2)} €
                  </span>
                </div>

                <button
                  onClick={onConfirmOrder}
                  className="mt-4 w-full cursor-pointer bg-[#F2EFE9] py-3.5 font-condensed text-[14px] font-semibold uppercase tracking-[0.2em] text-[#101010] transition-colors hover:bg-white active:bg-[#DDD9D2]"
                >
                  Enviar a cocina
                </button>
              </footer>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
