import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Sparkles, Leaf, Wheat, Box, Scale } from "lucide-react";

const badgeVariants = cva(
  "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide backdrop-blur-md transition-colors",
  {
    variants: {
      variant: {
        ar: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
        arSolid: "bg-amber-500 text-stone-950 font-bold shadow-sm",
        chef: "bg-rose-500/20 text-rose-300 border border-rose-500/30",
        veg: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
        glutenFree: "bg-sky-500/20 text-sky-300 border border-sky-500/30",
        scale:
          "bg-stone-800/80 text-stone-200 border border-stone-700 font-mono text-[10px]",
        neutral: "bg-stone-900/80 text-stone-300 border border-stone-800",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  icon?: "ar" | "chef" | "veg" | "glutenFree" | "scale";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant,
  icon,
  children,
  ...props
}) => {
  return (
    <span className={badgeVariants({ variant, className })} {...props}>
      {icon === "ar" && <Box className="w-3 h-3" />}
      {icon === "chef" && <Sparkles className="w-3 h-3 text-rose-400" />}
      {icon === "veg" && <Leaf className="w-3 h-3 text-emerald-400" />}
      {icon === "glutenFree" && <Wheat className="w-3 h-3 text-sky-400" />}
      {icon === "scale" && <Scale className="w-3 h-3 text-amber-400" />}
      {children}
    </span>
  );
};
