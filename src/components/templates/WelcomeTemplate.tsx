'use client';

import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';

interface WelcomeTemplateProps {
  tableNumber: string;
  onEnter: () => void;
}

export const WelcomeTemplate: React.FC<WelcomeTemplateProps> = ({ tableNumber, onEnter }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const bgGlowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        bgGlowRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.6 }
      )
        .fromTo(
          headerRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=1.2'
        )
        .fromTo(
          badgeRef.current,
          { opacity: 0, y: 15, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7 },
          '-=0.6'
        )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.5'
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between p-6 sm:p-12 overflow-hidden bg-[#08090A] text-[#F4F4F5]"
    >
      {/* 1. HAIKEI ORGANIC SVG BACKGROUND TEXTURE */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        <svg
          className="w-full h-full object-cover"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="haikei-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E5C378" stopOpacity="0.12" />
              <stop offset="50%" stopColor="#C7A75C" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#08090A" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="haikei-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E232B" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#08090A" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Organic Topographic Waves inspired by Haikei */}
          <path
            d="M0,280 C320,380 420,160 720,240 C1020,320 1120,200 1440,260 L1440,900 L0,900 Z"
            fill="url(#haikei-grad-2)"
          />
          <path
            d="M0,420 C280,320 540,500 840,400 C1140,300 1260,460 1440,390 L1440,900 L0,900 Z"
            fill="#0B0D10"
            fillOpacity="0.6"
          />
          <path
            d="M0,580 C360,640 480,480 820,540 C1160,600 1240,490 1440,520 L1440,900 L0,900 Z"
            fill="url(#haikei-grad-1)"
          />
          <path
            d="M0,700 C400,650 600,750 960,680 C1280,620 1360,710 1440,690 L1440,900 L0,900 Z"
            fill="#070809"
            fillOpacity="0.85"
          />
        </svg>
      </div>

      {/* Resplandor ambiental de fondo cálido sutil */}
      <div
        ref={bgGlowRef}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(229,195,120,0.08),transparent_70%)] blur-[90px] pointer-events-none"
      />

      {/* Viñeta cinematográfica exterior */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#08090A_95%)] pointer-events-none" />

      {/* Top Header */}
      <header
        ref={headerRef}
        className="relative z-10 flex items-center justify-between w-full max-w-lg mx-auto pt-2"
      >
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
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-[6px] bg-[#0D0F12]/80 border border-[#E5C378]/25 text-[11px] font-semibold tracking-[0.2em] text-[#E5C378] uppercase mb-8 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
        >
          <Sparkles className="w-3 h-3 text-[#E5C378]" />
          <span>SALÓN PRINCIPAL</span>
          <span className="text-[#C7A75C]">•</span>
          <span>{tableNumber}</span>
        </div>

        {/* Display Typography */}
        <h1
          ref={titleRef}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#F4F4F5] font-display uppercase leading-[1.08] mb-4"
        >
          SEASONAL <br />
          <span className="text-[#E5C378] bg-gradient-to-r from-[#E5C378] via-[#F4E3B2] to-[#C7A75C] bg-clip-text text-transparent">
            CURATION
          </span>
        </h1>

        <p
          ref={descRef}
          className="text-xs sm:text-sm text-[#9FA4AD] max-w-xs sm:max-w-sm leading-relaxed tracking-wide font-normal"
        >
          Una exploración sensorial de la materia noble, técnica contemporánea y alta gastronomía proyectada sobre su mesa.
        </p>
      </main>

      {/* Bottom CTA */}
      <footer ref={ctaRef} className="relative z-10 w-full max-w-lg mx-auto pb-4">
        <button
          onClick={onEnter}
          className="w-full h-14 rounded-[6px] bg-[#E5C378] hover:bg-[#F0DFA8] text-[#08090A] font-bold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-all duration-200 active:scale-[0.98] shadow-[0_10px_30px_rgba(229,195,120,0.2)] cursor-pointer"
        >
          <span>EXPLORAR CARTA</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </footer>
    </div>
  );
};
