import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-2xl font-bold transition-all duration-200 active:scale-95 cursor-pointer disabled:opacity-50 disabled:pointer-events-none select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-[0_0_25px_rgba(245,158,11,0.3)]",
        secondary:
          "bg-stone-900/90 hover:bg-stone-800 text-stone-200 border border-stone-800 backdrop-blur-md",
        glass:
          "bg-stone-950/70 hover:bg-stone-900/80 text-stone-100 border border-white/10 backdrop-blur-xl",
        icon: "p-2.5 rounded-full bg-stone-950/80 hover:bg-stone-900 text-stone-300 hover:text-white border border-stone-800 backdrop-blur-md",
      },
      size: {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2.5 text-sm",
        lg: "px-6 py-3.5 text-base",
        icon: "w-10 h-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  children,
  ...props
}) => {
  return (
    <button className={buttonVariants({ variant, size, className })} {...props}>
      {children}
    </button>
  );
};
