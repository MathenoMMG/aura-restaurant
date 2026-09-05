import React from 'react';
import { Box, Image as ImageIcon } from 'lucide-react';

interface ModeSwitchProps {
  mode: 'photo' | '3d';
  onChange: (mode: 'photo' | '3d') => void;
}

export const ModeSwitch: React.FC<ModeSwitchProps> = ({ mode, onChange }) => {
  return (
    <div className="flex items-center p-1 rounded-[6px] bg-[#121519]/90 border border-white/[0.08] backdrop-blur-xl shadow-2xl">
      <button
        onClick={() => onChange('photo')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer select-none ${
          mode === 'photo'
            ? 'bg-[#E5C378] text-[#08090A] shadow-md'
            : 'text-[#9FA4AD] hover:text-[#F4F4F5]'
        }`}
      >
        <ImageIcon className="w-3.5 h-3.5" />
        <span>FOTOGRAFÍA</span>
      </button>
      <button
        onClick={() => onChange('3d')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer select-none ${
          mode === '3d'
            ? 'bg-[#E5C378] text-[#08090A] shadow-md'
            : 'text-[#9FA4AD] hover:text-[#F4F4F5]'
        }`}
      >
        <Box className="w-3.5 h-3.5" />
        <span>360° ESTUDIO</span>
      </button>
    </div>
  );
};
