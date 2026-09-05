"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dish } from "@/types/menu";
import { X, Plus, Minus, Check } from "lucide-react";

interface FullViewportViewerProps {
  dish: Dish | null;
  onClose: () => void;
  onAddToCart: (dish: Dish, quantity: number, notes: string) => void;
}

/**
 * Detalle del plato.
 *
 * El reparto de pantalla depende de si el plato tiene modelo 3D:
 * con modelo, la vista del plato manda y ocupa la mayor parte del alto;
 * sin modelo no hay nada que mirar, así que la ficha gana el espacio.
 *
 * En ambos casos el bloque de medios se compacta al bajar, para que la
 * información quede accesible sin perder de vista el plato.
 */
export const FullViewportViewer: React.FC<FullViewportViewerProps> = ({
  dish,
  onClose,
  onAddToCart,
}) => {
  const [mode, setMode] = useState<"photo" | "3d">("photo");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [collapse, setCollapse] = useState(0);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);

  const hasAR = Boolean(dish?.model3dUrl);
  const photos = dish?.gallery?.length
    ? dish.gallery
    : dish
      ? [dish.imageUrl]
      : [];

  // Alto del bloque de medios: el plato con AR merece la pantalla; sin AR,
  // la ficha es lo único que aporta, así que se le cede el espacio.
  const mediaMax = hasAR ? 58 : 34;
  const mediaMin = 17;
  const mediaHeight = mediaMax - (mediaMax - mediaMin) * collapse;

  useEffect(() => {
    setMode("photo");
    setQuantity(1);
    setNotes("");
    setPhotoIndex(0);
    setCollapse(0);
    scrollRef.current?.scrollTo({ top: 0 });
  }, [dish?.id]);

  useEffect(() => {
    if (customElements.get("model-viewer")) {
      setScriptLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js";
    script.onload = () => setScriptLoaded(true);
    document.head.appendChild(script);
  }, []);

  // Bloquea el scroll del documento: sin esto el gesto se propaga a la carta.
  useEffect(() => {
    if (!dish) return;
    const { body } = document;
    const scrollY = window.scrollY;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      window.scrollTo(0, scrollY);
    };
  }, [dish]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCollapse(Math.min(1, Math.max(0, el.scrollTop / 220)));
  }, []);

  const handleRailScroll = useCallback(() => {
    const el = railRef.current;
    if (!el || el.clientWidth === 0) return;
    setPhotoIndex(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  if (!dish) return null;

  const handleAdd = () => {
    onAddToCart(dish, quantity, notes);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 700);
  };

  const specs: Array<[string, string]> = [
    ...(dish.portionWeight
      ? ([["Peso", dish.portionWeight]] as Array<[string, string]>)
      : []),
    ["Pase", `${dish.prepTimeMinutes} min`],
    [
      "Dieta",
      dish.dietary.vegan
        ? "Vegano"
        : dish.dietary.vegetarian
          ? "Vegetariano"
          : dish.dietary.glutenFree
            ? "Sin gluten"
            : "—",
    ],
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={dish.name}
      className="fixed inset-0 z-50 flex h-[100dvh] flex-col bg-[#101010] text-[#F2EFE9]"
    >
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto overscroll-contain"
      >
        {/* MEDIOS — se compactan al bajar */}
        <div
          className="sticky top-0 z-20 bg-[#101010]"
          style={{ height: `${mediaHeight}dvh` }}
        >
          {mode === "3d" && dish.model3dUrl && scriptLoaded ? (
            React.createElement("model-viewer", {
              src: dish.model3dUrl,
              "ios-src": dish.usdzUrl || undefined,
              poster: dish.imageUrl,
              alt: dish.name,
              "auto-rotate": true,
              "rotation-per-second": "14deg",
              "camera-controls": true,
              ar: true,
              // Scene Viewer primero: ancla con ARCore y no deriva al andar.
              "ar-modes": "scene-viewer webxr quick-look",
              "xr-environment": true,
              "ar-scale": "fixed",
              "ar-placement": "floor",
              "shadow-intensity": "1.6",
              exposure: "1.05",
              style: {
                width: "100%",
                height: "100%",
                outline: "none",
                backgroundColor: "#101010",
              },
              children: (
                <button
                  slot="ar-button"
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 cursor-pointer whitespace-nowrap bg-[#F2EFE9] px-6 py-3 font-condensed text-[13px] font-semibold uppercase tracking-[0.2em] text-[#101010]"
                >
                  Verlo en su mesa
                </button>
              ),
            })
          ) : (
            <div
              ref={railRef}
              onScroll={handleRailScroll}
              className="scrollbar-none flex h-full w-full snap-x snap-mandatory overflow-x-auto"
            >
              {photos.map((src, i) => (
                <div key={src} className="h-full w-full shrink-0 snap-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${dish.name} — foto ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Degradado sólo bajo los controles, para que se lean sobre la foto */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#101010]/80 to-transparent" />
          {/* Y otro abajo: sin él los conmutadores se pierden sobre fotos claras */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#101010]/85 to-transparent" />

          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute left-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center text-[#F2EFE9] transition-colors hover:text-[#B8845F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B8845F]"
          >
            <X className="h-6 w-6 stroke-[1.5]" />
          </button>

          {/* Índice de fotos / conmutador de vista, abajo y separados */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between px-5 pb-4">
            {mode === "photo" && photos.length > 1 ? (
              <div className="pointer-events-auto flex gap-1.5">
                {photos.map((src, i) => (
                  <span
                    key={src}
                    className={`h-[3px] w-6 transition-colors ${
                      i === photoIndex ? "bg-[#F2EFE9]" : "bg-[#F2EFE9]/30"
                    }`}
                  />
                ))}
              </div>
            ) : (
              <span />
            )}

            {hasAR && (
              <div className="pointer-events-auto flex gap-4">
                <ViewTab
                  label="Fotos"
                  active={mode === "photo"}
                  onClick={() => setMode("photo")}
                />
                <ViewTab
                  label="360° y AR"
                  active={mode === "3d"}
                  onClick={() => setMode("3d")}
                />
              </div>
            )}
          </div>
        </div>

        {/* FICHA */}
        <div className="relative z-10 bg-[#101010] px-5 pb-8 pt-6 sm:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-condensed text-[30px] font-semibold uppercase leading-[1] tracking-[0.005em] text-balance">
              {dish.name}
            </h2>

            <div className="mt-3 flex items-baseline gap-4 border-b border-[#F2EFE9]/10 pb-4">
              <span className="font-tech text-[22px] tabular-nums text-[#F2EFE9]">
                {dish.price.toFixed(2)} €
              </span>
              {dish.portionWeight && (
                <span className="font-tech text-[11px] tracking-[0.14em] text-[#5C5952]">
                  {dish.portionWeight}
                </span>
              )}
            </div>

            <p className="mt-4 text-[15px] leading-[1.55] text-[#B8845F]">
              {dish.tagline}
            </p>

            <p className="mt-3 text-[14px] leading-[1.65] text-[#8A867E]">
              {dish.description}
            </p>

            <dl className="mt-6 grid grid-cols-3 border-y border-[#F2EFE9]/10">
              {specs.map(([label, value], i) => (
                <div
                  key={label}
                  className={`py-3.5 ${i > 0 ? "border-l border-[#F2EFE9]/10 pl-4" : ""}`}
                >
                  <dt className="font-tech text-[9px] uppercase tracking-[0.16em] text-[#5C5952]">
                    {label}
                  </dt>
                  <dd className="mt-1 font-tech text-[13px] text-[#F2EFE9]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            {dish.ingredients.length > 0 && (
              <Block label="Ingredientes">{dish.ingredients.join(", ")}</Block>
            )}

            {(dish.sommelierPairing || dish.pairing) && (
              <Block label="Maridaje">
                {dish.sommelierPairing || dish.pairing}
              </Block>
            )}

            {dish.originStory && (
              <Block label="Origen">{dish.originStory}</Block>
            )}

            <div className="mt-7">
              <label
                htmlFor="dish-notes"
                className="font-tech text-[9px] uppercase tracking-[0.16em] text-[#5C5952]"
              >
                Indicaciones para cocina
              </label>
              <input
                id="dish-notes"
                type="text"
                placeholder="Sin sal, término medio…"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-2 w-full border-b border-[#F2EFE9]/15 bg-transparent pb-2 text-[14px] text-[#F2EFE9] placeholder-[#5C5952] transition-colors focus:border-[#B8845F] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ACCIÓN */}
      <footer
        className="flex items-stretch gap-3 border-t border-[#F2EFE9]/10 bg-[#101010] px-5 py-3 sm:px-8"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      >
        <div className="flex items-center border border-[#F2EFE9]/15">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Quitar una unidad"
            className="cursor-pointer px-3 py-3 text-[#8A867E] transition-colors hover:text-[#F2EFE9]"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-7 text-center font-tech text-[14px] tabular-nums">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Añadir una unidad"
            className="cursor-pointer px-3 py-3 text-[#8A867E] transition-colors hover:text-[#F2EFE9]"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <button
          onClick={handleAdd}
          className={`flex flex-1 cursor-pointer items-center justify-center gap-2 px-5 font-condensed text-[14px] font-semibold uppercase tracking-[0.2em] transition-colors ${
            justAdded
              ? "bg-[#B8845F] text-[#101010]"
              : "bg-[#F2EFE9] text-[#101010] hover:bg-white"
          }`}
        >
          {justAdded ? (
            <>
              <Check className="h-4 w-4 stroke-[2.5]" />
              <span>Añadido</span>
            </>
          ) : (
            <span>Añadir al pedido</span>
          )}
        </button>
      </footer>
    </div>
  );
};

const ViewTab: React.FC<{
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    aria-pressed={active}
    className={`cursor-pointer whitespace-nowrap border-b pb-1 font-tech text-[10px] uppercase tracking-[0.16em] transition-colors ${
      active
        ? "border-[#F2EFE9] text-[#F2EFE9]"
        : "border-transparent text-[#F2EFE9]/50 hover:text-[#F2EFE9]/80"
    }`}
  >
    {label}
  </button>
);

const Block: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div className="mt-6">
    <h3 className="font-tech text-[9px] uppercase tracking-[0.16em] text-[#5C5952]">
      {label}
    </h3>
    <p className="mt-1.5 text-[14px] leading-[1.6] text-[#8A867E]">
      {children}
    </p>
  </div>
);
