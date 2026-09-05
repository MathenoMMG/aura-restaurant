import React from "react";

interface ScrimOverlayProps {
  position?: "top" | "bottom";
  className?: string;
  children?: React.ReactNode;
}

export const ScrimOverlay: React.FC<ScrimOverlayProps> = ({
  position = "bottom",
  className = "",
  children,
}) => {
  const gradient =
    position === "bottom"
      ? "bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent"
      : "bg-gradient-to-b from-stone-950 via-stone-950/80 to-transparent";

  return (
    <div className={`pointer-events-none ${gradient} ${className}`}>
      <div className="pointer-events-auto">{children}</div>
    </div>
  );
};
