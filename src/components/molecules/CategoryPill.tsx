import React from "react";

interface CategoryPillProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const CategoryPill: React.FC<CategoryPillProps> = ({
  label,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer select-none ${
        isActive
          ? "bg-amber-500 text-stone-950 shadow-md font-bold"
          : "bg-stone-900/80 text-stone-400 hover:text-stone-200 border border-stone-800 hover:border-stone-700"
      }`}
    >
      {label}
    </button>
  );
};
