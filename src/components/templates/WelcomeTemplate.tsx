"use client";

import React from "react";

interface WelcomeTemplateProps {
  tableNumber: string;
  onEnter: () => void;
}

/**
 * Pantalla de bienvenida.
 *
 * Es la antesala que ve el comensal al escanear el QR de la mesa, y su único
 * trabajo es dar la bienvenida y dejar pasar a la carta. Nada de datos de
 * plato ni de servicio: esa información pertenece a las pantallas siguientes.
 *
 * La entrada va en CSS (`.aura-in`) y no en GSAP a propósito: una animación
 * por JS que no llega a arrancar deja la pantalla en blanco, porque el estado
 * inicial queda escrito en el atributo `style` del elemento.
 */
export const WelcomeTemplate: React.FC<WelcomeTemplateProps> = ({
  tableNumber,
  onEnter,
}) => (
  <div
    /* 100dvh, no 100vh: en móvil la barra de URL desplazaba el layout. */
    className="relative h-[100dvh] w-full overflow-hidden bg-[#101010] text-[#F2EFE9]"
    style={{
      paddingTop: "env(safe-area-inset-top)",
      paddingBottom: "env(safe-area-inset-bottom)",
    }}
  >
    {/* Retícula de 4 columnas, apenas perceptible */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0_calc(25%-1px),rgba(242,239,233,0.04)_calc(25%-1px)_25%)]"
    />

    <div className="relative flex h-full flex-col px-6 pb-6 pt-5 sm:px-10">
      <header className="aura-in flex items-baseline justify-between border-b border-[#F2EFE9]/10 pb-2.5">
        <span className="font-condensed text-[15px] font-semibold uppercase tracking-[0.36em] text-[#F2EFE9]">
          Aura
        </span>
        <span className="font-tech text-[9px] uppercase tracking-[0.22em] text-[#7E7A72]">
          {tableNumber}
        </span>
      </header>

      <main className="flex flex-1 flex-col justify-center gap-4">
        <h1
          className="aura-in font-condensed text-[clamp(52px,17vw,76px)] font-semibold uppercase leading-[0.94] tracking-[-0.005em]"
          style={{ animationDelay: "0.12s" }}
        >
          Bienvenido
        </h1>

        <p
          className="aura-in max-w-[24ch] font-tech text-[11px] font-light leading-[1.7] text-[#8A867E]"
          style={{ animationDelay: "0.22s" }}
        >
          Su mesa está lista. Explore la carta cuando quiera.
        </p>
      </main>

      <button
        onClick={onEnter}
        className="aura-in w-full cursor-pointer bg-[#F2EFE9] py-3.5 font-condensed text-[13px] font-semibold uppercase tracking-[0.22em] text-[#101010] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8845F] active:bg-[#DDD9D2]"
        style={{ animationDelay: "0.32s" }}
      >
        Ver la carta
      </button>
    </div>
  </div>
);
