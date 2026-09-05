'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface WelcomeTemplateProps {
  tableNumber: string;
  onEnter: () => void;
}

export const WelcomeTemplate: React.FC<WelcomeTemplateProps> = ({ tableNumber, onEnter }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between p-6 sm:p-12 overflow-hidden bg-[#08090A] text-[#F4F4F5]">
      {/* Resplandor ambiental de fondo sutil */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] rounded-full bg-[#E5C378]/[0.035] blur-[100px] pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 flex items-center justify-between w-full max-w-lg mx-auto pt-2">
        <div className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl font-bold tracking-[0.25em] text-[#E5C378] font-display">
            AURA
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs tracking-widest text-[#9FA4AD] font-medium">
          <span className="text-[#E5C378] font-semibold cursor-pointer">ES</span>
          <span className="text-[#2A303C]">|</span>
          <span className="hover:text-white cursor-pointer transition-colors">EN</span>
        </div>
      </header>

      {/* Central Module */}
      <main className="relative z-10 w-full max-w-lg mx-auto my-auto py-12 flex flex-col items-center text-center">
        {/* Reservation Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[6px] bg-[#0D0F12] border border-[#E5C378]/25 text-[11px] font-semibold tracking-[0.2em] text-[#E5C378] uppercase mb-8 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <span>SALÓN PRINCIPAL</span>
          <span className="text-[#C7A75C]">•</span>
          <span>{tableNumber}</span>
        </div>

        {/* Display Typography */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#F4F4F5] font-display uppercase leading-[1.08] mb-4">
          SEASONAL <br />
          <span className="text-[#E5C378]">CURATION</span>
        </h1>

        <p className="text-xs sm:text-sm text-[#9FA4AD] max-w-xs sm:max-w-sm leading-relaxed tracking-wide font-normal">
          Una exploración sensorial de la materia noble, técnica contemporánea y alta gastronomía en tres dimensiones.
        </p>
      </main>

      {/* Bottom CTA */}
      <footer className="relative z-10 w-full max-w-lg mx-auto pb-4">
        <button
          onClick={onEnter}
          className="w-full h-14 rounded-[6px] bg-[#E5C378] hover:bg-[#F0DFA8] text-[#08090A] font-bold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-all duration-200 active:scale-[0.98] shadow-[0_10px_30px_rgba(229,195,120,0.15)] cursor-pointer"
        >
          <span>EXPLORAR CARTA</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </footer>
    </div>
  );
};
