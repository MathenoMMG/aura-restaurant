import * as React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        poster?: string;
        alt?: string;
        "auto-rotate"?: boolean | string;
        "rotation-per-second"?: string;
        "camera-controls"?: boolean | string;
        "touch-action"?: string;
        ar?: boolean | string;
        "ar-modes"?: string;
        "ar-scale"?: string;
        "shadow-intensity"?: string;
        "shadow-softness"?: string;
        exposure?: string;
        style?: React.CSSProperties;
        onLoad?: () => void;
        children?: React.ReactNode;
      };
    }
  }
}
