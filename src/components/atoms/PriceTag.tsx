import React from 'react';

interface PriceTagProps {
  amount: number;
  currencySymbol?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const PriceTag: React.FC<PriceTagProps> = ({
  amount,
  currencySymbol = '€',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-sm font-bold',
    md: 'text-lg font-bold',
    lg: 'text-2xl font-extrabold',
    xl: 'text-3xl font-black',
  };

  return (
    <span className={`text-amber-400 font-sans tracking-tight ${sizeClasses[size]} ${className}`}>
      {amount.toFixed(2)} <span className="text-xs font-semibold text-amber-500/80">{currencySymbol}</span>
    </span>
  );
};
