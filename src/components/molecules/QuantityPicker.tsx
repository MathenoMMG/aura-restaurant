import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantityPickerProps {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  className?: string;
}

export const QuantityPicker: React.FC<QuantityPickerProps> = ({
  value,
  onChange,
  min = 1,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-3 bg-stone-950/80 border border-stone-800/80 rounded-2xl px-3 py-1.5 backdrop-blur-md ${className}`}>
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="p-1 text-stone-400 hover:text-white transition-colors cursor-pointer active:scale-90"
        aria-label="Reducir cantidad"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="font-bold text-sm text-stone-100 w-5 text-center select-none font-mono">
        {value}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        className="p-1 text-stone-400 hover:text-white transition-colors cursor-pointer active:scale-90"
        aria-label="Aumentar cantidad"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};
