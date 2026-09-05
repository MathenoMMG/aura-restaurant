import React from 'react';
import { Box, Camera } from 'lucide-react';

interface ModeSwitchProps {
  mode: '3d' | 'ar';
  onChange: (mode: '3d' | 'ar') => void;
}

export const ModeSwitch: React.FC<ModeSwitchProps> = ({ mode, onChange }) => {
  return (
    <div className="flex items-center p-1 rounded-full bg-stone-950/80 border border-white/10 backdrop-blur-xl shadow-2xl">
      <button
        onClick={() => onChange('3d')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer select-none ${
          mode === '3d'
            ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
            : 'text-stone-400 hover:text-stone-200'
        }`}
      >
        <Box className="w-3.5 h-3.5" />
        <span>360° Estudio</span>
      </button>
      <button
        onClick={() => onChange('ar')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer select-none ${
          mode === 'ar'
            ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
            : 'text-stone-400 hover:text-stone-200'
        }`}
      >
        <Camera className="w-3.5 h-3.5" />
        <span>Cámara AR</span>
      </button>
    </div>
  );
};
