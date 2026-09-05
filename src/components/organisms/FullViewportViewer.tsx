'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Dish } from '@/types/menu';
import { ModeSwitch } from '@/components/molecules/ModeSwitch';
import { QuantityPicker } from '@/components/molecules/QuantityPicker';
import { X, RotateCcw, Camera, Check, ShoppingBag, Wine } from 'lucide-react';

interface FullViewportViewerProps {
  dish: Dish | null;
  onClose: () => void;
  onAddToCart: (dish: Dish, quantity: number, notes: string) => void;
}

export const FullViewportViewer: React.FC<FullViewportViewerProps> = ({
  dish,
  onClose,
  onAddToCart,
}) => {
  // Por defecto siempre abre en modo 'photo' (fotografía editorial)
  const [mode, setMode] = useState<'photo' | '3d'>('photo');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const viewerRef = useRef<any>(null);

  // Reiniciar a modo photo cuando cambia de plato
  useEffect(() => {
    setMode('photo');
    setQuantity(1);
    setNotes('');
  }, [dish?.id]);

  useEffect(() => {
    if (!customElements.get('model-viewer')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js';
      script.onload = () => setScriptLoaded(true);
      document.head.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
  }, []);

  if (!dish) return null;

  const handleTriggerAR = () => {
    if (viewerRef.current && typeof viewerRef.current.activateAR === 'function') {
      viewerRef.current.activateAR();
    }
  };

  const handleAdd = () => {
    onAddToCart(dish, quantity, notes);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 750);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#08090A] flex flex-col justify-between overflow-hidden animate-in fade-in duration-300">
      {/* 1. TOP HUD (Floating Glassmorphism Bar) */}
      <header className="relative z-20 px-4 sm:px-8 pt-4 pb-3 flex items-center justify-between bg-gradient-to-b from-[#08090A] via-[#08090A]/80 to-transparent">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-[6px] bg-[#121519]/90 hover:bg-[#1A1E24] text-[#9FA4AD] hover:text-[#F4F4F5] border border-white/[0.08] flex items-center justify-center transition-colors cursor-pointer shadow-lg active:scale-95"
          aria-label="Cerrar visor"
        >
          <X className="w-5 h-5" />
        </button>

        {dish.model3dUrl && (
          <ModeSwitch mode={mode} onChange={setMode} />
        )}

        <div className="flex items-center gap-2">
          {dish.portionWeight && (
            <span className="px-2.5 py-1 rounded-[4px] text-[10px] font-mono font-medium tracking-wider bg-[#121519]/90 text-[#E5C378] border border-[#E5C378]/25 backdrop-blur-md">
              {dish.portionWeight}
            </span>
          )}
        </div>
      </header>

      {/* 2. FULL-VIEWPORT CANVAS (100dvh Center) */}
      <main className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden">
        {/* Glow ambiental para Modo Estudio */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(229,195,120,0.06),transparent_65%)] pointer-events-none" />

        {/* MODO 360° ESTUDIO */}
        {mode === '3d' && dish.model3dUrl && scriptLoaded ? (
          <div className="relative w-full h-full flex items-center justify-center">
            {React.createElement(
              'model-viewer',
              {
                ref: viewerRef,
                src: dish.model3dUrl,
                'ios-src': dish.usdzUrl || undefined,
                poster: dish.imageUrl,
                alt: dish.name,
                'auto-rotate': true,
                'rotation-per-second': '15deg',
                'camera-controls': true,
                'touch-action': 'pan-y',
                ar: true,
                'ar-modes': 'webxr scene-viewer quick-look',
                'ar-scale': 'fixed',
                'ar-placement': 'floor',
                'shadow-intensity': '1.8',
                'shadow-softness': '0.8',
                exposure: '1.1',
                style: { width: '100%', height: '100%', outline: 'none' },
              },
              <button
                slot="ar-button"
                className="absolute top-4 right-4 z-20 flex items-center gap-2 px-4 py-2.5 rounded-[6px] bg-[#E5C378] hover:bg-[#F0DFA8] text-[#08090A] font-bold text-xs tracking-wider uppercase shadow-[0_0_25px_rgba(229,195,120,0.3)] transition-transform active:scale-95 cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                <span>PROYECTAR EN MESA</span>
              </button>
            )}

            {/* Botón flotante accesible de Proyectar en Mesa si el slot no se presiona */}
            <button
              onClick={handleTriggerAR}
              className="absolute top-4 right-4 z-20 flex items-center gap-2 px-4 py-2.5 rounded-[6px] bg-[#E5C378] hover:bg-[#F0DFA8] text-[#08090A] font-bold text-xs tracking-wider uppercase shadow-[0_0_25px_rgba(229,195,120,0.35)] transition-transform active:scale-95 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>PROYECTAR EN MESA</span>
            </button>
          </div>
        ) : (
          /* MODO FOTOGRAFÍA EDITORIAL (Por defecto) */
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6">
            <img
              src={dish.imageUrl}
              alt={dish.name}
              className="max-h-[60vh] sm:max-h-[68vh] w-auto max-w-full object-contain rounded-[14px] shadow-2xl border border-white/[0.08]"
            />
            {dish.model3dUrl && (
              <button
                onClick={() => setMode('3d')}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-[6px] bg-[#121519]/90 hover:bg-[#1A1E24] text-[#E5C378] border border-[#E5C378]/30 text-xs font-bold tracking-widest uppercase transition-all backdrop-blur-md cursor-pointer active:scale-95 shadow-lg"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#E5C378]" />
                <span>ACTIVAR VISTA 360° & AR</span>
              </button>
            )}
          </div>
        )}

        {/* Indicador de gesto táctil en 3D */}
        {mode === '3d' && (
          <div className="absolute bottom-3 left-4 pointer-events-none flex items-center gap-2 text-[#9FA4AD] text-[11px] bg-[#08090A]/85 backdrop-blur-md px-3 py-1 rounded-[4px] border border-white/[0.08]">
            <RotateCcw className="w-3 h-3 text-[#E5C378]" />
            <span>Rotación 360° • Pellizco para zoom</span>
          </div>
        )}
      </main>

      {/* 3. BOTTOM FLOATING HUD (Ficha Sensorial & Controls) */}
      <footer className="relative z-20 px-4 sm:px-6 pb-6 pt-3 bg-gradient-to-t from-[#08090A] via-[#08090A]/95 to-transparent flex flex-col gap-3 max-w-xl mx-auto w-full">
        {/* Cabecera del plato y precio */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#F4F4F5] tracking-tight font-display uppercase line-clamp-1">
              {dish.name}
            </h2>
            <p className="text-xs text-[#E5C378] font-medium tracking-wide mt-0.5 line-clamp-1">
              {dish.tagline}
            </p>
          </div>
          <span className="text-xl sm:text-2xl font-bold text-[#E5C378] font-mono tabular-nums">
            {(dish.price * quantity).toFixed(2)} €
          </span>
        </div>

        {/* Ficha Sensorial Compacta */}
        {(dish.sommelierPairing || dish.pairing || dish.originStory) && (
          <div className="p-3 rounded-[6px] bg-[#0D0F12] border border-white/[0.06] text-xs text-[#9FA4AD] space-y-1.5">
            {(dish.sommelierPairing || dish.pairing) && (
              <div className="flex items-center gap-2 text-[11px]">
                <Wine className="w-3.5 h-3.5 text-[#E5C378] shrink-0" />
                <span className="text-[#F4F4F5] font-medium">Maridaje:</span>
                <span className="truncate">{dish.sommelierPairing || dish.pairing}</span>
              </div>
            )}
            {dish.originStory && (
              <p className="text-[11px] line-clamp-2 leading-relaxed text-[#9FA4AD]">
                {dish.originStory}
              </p>
            )}
          </div>
        )}

        {/* Notas breves para cocina */}
        <input
          type="text"
          placeholder="Instrucciones especiales para cocina (ej. sin sal, término medio)..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-[6px] bg-[#0D0F12] border border-white/[0.08] text-[#F4F4F5] placeholder-[#9FA4AD]/50 text-xs focus:outline-none focus:border-[#E5C378]/60 transition-colors"
        />

        {/* Fila de acción: Selector de Cantidad + Botón Añadir */}
        <div className="flex items-center gap-3">
          <QuantityPicker value={quantity} onChange={setQuantity} />
          <button
            onClick={handleAdd}
            className={`flex-1 h-12 px-5 rounded-[6px] font-bold text-xs tracking-[0.18em] uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl active:scale-[0.98] ${
              justAdded
                ? 'bg-emerald-500 text-[#08090A]'
                : 'bg-[#E5C378] hover:bg-[#F0DFA8] text-[#08090A] shadow-[0_0_25px_rgba(229,195,120,0.3)]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>AGREGADO A LA COMANDA</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
                <span>AÑADIR A LA COMANDA</span>
              </>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
};
