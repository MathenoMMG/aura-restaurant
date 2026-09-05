# Prompts Maestros Definitivos para Google Stitch: Aura Gastronomique (Mobile-First WebAR)

> **Destino:** Google Stitch (`projects/9234498351317745527`)  
> **Modelo Stitch:** `GEMINI_3_1_PRO`  
> **Dispositivo:** `MOBILE` (`390x844px`)  
> **Fuente de Verdad:** Basado al 100% en `restaurant_ux_specification.md`

---

## 🎨 1. Sistema de Diseño Visual y Reglas Anti-Slop (Taste & Frontend Standards)

- **Atmósfera:** *Cinematic Dark Gourmet & Minimalist Luxury*.
  - **Fondo Base:** Negro obsidiana profundo (`#08090A` / `hsl(240, 10%, 4%)`) con iluminación radial cenital cálida (`radial-gradient(circle at 50% 30%, rgba(229,195,120,0.07), transparent 70%)`).
  - **Acento Primario:** Champagne Gold refinado (`#E5C378` / `#D4AF37`) en acabado satinado mate para precios, estados activos y CTAs de acción.
  - **Elevación y Superficies Glassmorphism:**
    - Descarte absoluto de sombras grises difusas genéricas.
    - Sombra multicapa calibrada: `box-shadow: 0 4px 12px -2px rgba(0,0,0,0.6), 0 16px 32px -4px rgba(0,0,0,0.8), inset 0 1px 0 0 rgba(255,255,255,0.08)`.
    - Vidrio ahumado con `backdrop-filter: blur(24px)` y micro-borde interior luminoso de 1px (`border: 1px solid rgba(255, 255, 255, 0.08)`).
- **Tipografía Editorial:**
  - Títulos de platos y display: Tipografía editorial romana con serif de alta costura (*Playfair Display*, *Cormorant Garamond* o *Fraunces* en weight 600-700) con espaciado óptico estricto.
  - Datos numéricos, precios y badges: Sans-serif geométrica de precisión (*Satoshi*, *Cabinet Grotesk*) con números monoespaciados (`tabular-nums`).

---

## 📱 2. Prompts de Generación Específicos para Stitch

### 🍸 PANTALLA 1: Welcome Screen & Onboarding de Mesa (Mobile Viewport 390×844px)
> **Parámetros:** `projectId: "9234498351317745527"`, `deviceType: "MOBILE"`, `modelId: "GEMINI_3_1_PRO"`

```text
An ultra-luxury mobile web landing and table welcome onboarding screen for a white-label fine-dining restaurant (Aura Gastronomique). High-fashion dark gourmet aesthetic, viewport 390x844px. Background is deep obsidian black (#08090A) with a subtle, warm amber-champagne radial glow descending from the center.

Top section features a minimalist language selector capsule in frosted glass ('EN | ES | IT | FR') and an understated luxury serif monogram crest 'AURA'.

Center section showcases a prestigious table identifier badge in dark smoked glass with gold rim highlight: 'Welcome to Table 14 • Main Dining Salon'. Directly below, an editorial serif headline: 'Haute Cuisine in Three Dimensions', accompanied by a refined 3-step micro-onboarding visual guide with ultra-clean thin gold line-art icons:
1. 'Sensorial Discovery' (Open book icon): Explore curated culinary creations.
2. 'Augmented Reality' (Holographic 3D cube icon): Project true-to-scale 1:1 dishes onto your physical table.
3. 'Unified Kitchen Comanda' (Chef bell icon): Consolidate your order directly to the culinary team.

Bottom area features an imposing full-width primary CTA button in radiant satin champagne gold (#E5C378) with crisp high-contrast black typography: 'Enter Dining Experience' with a subtle forward arrow. Extremely elegant, cinematic, atmospheric, zero clutter.
```

---

### 🌟 PANTALLA 2: Feed Principal del Menú Móvil (Mobile Viewport 390×844px)
> **Parámetros:** `projectId: "9234498351317745527"`, `deviceType: "MOBILE"`, `modelId: "GEMINI_3_1_PRO"`

```text
An ultra-luxury mobile web application interface for a white-label fine-dining restaurant interactive menu (Aura Gastronomique). High-fashion dark gourmet aesthetic, viewport 390x844px. Background is deep obsidian black (#08090A, hsl(240, 10%, 4%)) with subtle warm amber-champagne ambient radial glows. 

Top sticky floating glassmorphism header (backdrop blur 24px, 1px subtle luminous border): on the left, an understated luxury serif monogram logo 'AURA' with a delicate gold crest icon; in the center, a discreet frosted pill tag displaying active table status 'Table 14 • Main Salon'; on the right, a minimal obsidian shopping bag button with a glowing champagne gold counter badge '3'.

Hero header section features editorial high-fashion typography: Cormorant Garamond serif headline 'Curated Seasonal Creations' with a faint warm gold illumination, paired with a delicate muted subtitle: 'Project real-scale haute cuisine creations directly onto your table before ordering.'

Below the hero, a smooth horizontal touch-scrolling category navigation bar with dark frosted glass pills: 'Full Menu', 'Chef Signature', 'Land & Fire', 'Ocean & Raw Bar', 'Garden & Vegan', 'Desserts', 'Mixology'. Active pill is highlighted in solid matte champagne gold (#E5C378) with crisp dark text. Directly below, compact geometric filter toggles with micro-icons: '🔮 3D / AR Only', '🌱 Plant-Based', '🌾 Gluten-Free', '⭐ Chef Special'.

The main feed showcases asymmetric gourmet food cards crafted with deep charcoal slate backgrounds, 24px border radius, and calibrated multi-layer shadows (0 12px 32px rgba(0,0,0,0.7), 1px interior highlight border rgba(255,255,255,0.08)). Each card features a top-down cinematic photograph of an exquisite culinary dish with natural food lighting. Floating glass badges show '3D & AR Ready' with a subtle holographic shimmer, preparation time '18m', and portion weight '320g'. Dish title in high-contrast editorial serif, sensorial gold tagline, and minimalist ingredient description. The card footer exhibits the price in bold champagne gold ('48.00 €'), a tactile frosted glass 'Explore 3D' pill button with an AR cube icon, and an ergonomic '+' quick-add button in satin gold.

Floating at the bottom thumb zone is a translucent glassmorphic bar (blur 24px, gold accent border) showing table order summary: '3 creations • 116.00 €' with a right arrow pointing to the unified kitchen ticket drawer. Pure luxury, zero AI-slop, razor-sharp typography, cinematic dark hospitality design.
```

---

### 🔮 PANTALLA 3: Visor Inmersivo Full-Viewport HUD 100dvh + Ficha Sensorial Extendida (360° Estudio + Cámara AR + Storytelling + Maridaje)
> **Parámetros:** `projectId: "9234498351317745527"`, `deviceType: "MOBILE"`, `modelId: "GEMINI_3_1_PRO"`

```text
A full-viewport 100dvh immersive WebAR & 3D food viewer HUD interface with an extended sensorial bottom-sheet for a mobile luxury restaurant application. The screen represents a live 3D AR canvas where a photorealistic Michelin-starred culinary dish (A5 Miyazaki Wagyu Tenderloin with shaved Alba white truffles) is centered, casting accurate soft contact shadows on a dark textured gourmet surface.

TOP FLOATING HUD BAR (Glassmorphism, backdrop-blur 24px, 1px border rgba(255,255,255,0.08), rounded-full, floating 16px from top):
- Far Left: An ergonomic circular close button (44x44px) with a razor-thin minimalist '✕' cross icon in brushed platinum.
- Center: A tactile haptic toggle capsule with two distinct segmented states: active state '[ 360° Studio ]' in satin champagne gold (#E5C378) with obsidian bold text and subtle 3D cube icon, and inactive state '[ AR Camera on Table ]' in translucent smoked glass with camera glyph.
- Far Right: A frosted micro-badge showing portion fidelity: 'Scale 1:1 Real-Size • 320g'.

CANVAS INTERACTIVE ZONE:
- Floating subtle gesture guide pill: 'Drag to rotate 360° • Pinch to inspect textures' with a discreet floating glass recenter button ('⟲ Recenter').

EXTENDED SENSORIAL SLIDE-UP GLASS SHEET (Bottom sheet floating over the lower viewport, backdrop blur 32px, smoked obsidian glass rgba(14,16,20,0.9), border 1px solid rgba(229,195,120,0.2), rounded-t-3xl, shadow 0 20px 40px rgba(0,0,0,0.9)):
1. Upper Row: Dish title 'A5 Miyazaki Wagyu Tenderloin' in high-contrast editorial serif, sensorial tagline 'Seared over Binchotan charcoal, 10-year vintage Port reduction', and champagne gold price '58.00 €'.
2. Storytelling & Heritage block: A curated short paragraph explaining the ingredient provenance: 'Purebred Japanese Black cattle raised in Miyazaki prefecture, dry-aged for 45 days. Finished with winter Alba white truffles and gold leaf.'
3. Sommelier Pairing Card (Dark gold frosted container with wine glass icon): 'Sommelier Pairing: Vega Sicilia 'Único' Reserva Especial 2010 — Bold blackberry notes, tobacco leaves and velvety tannins perfectly balancing the marbling.'
4. Allergen Transparency: Sleek micro-chips with icons for 'Gluten-Free', 'No Dairy', 'Contains Sulfites'.
5. Kitchen Notes Input: 'Special preparation notes or allergy details for the chef...'
6. Action Row: Tactile quantity picker pill '[-] 1 [+]' in dark matte stone, alongside a full-width radiant satin champagne gold CTA button: 'Add to Table Order • 58.00 €' with an elegant forward chevron.

Ultra-clean, friction-free, dark luxury, spatial computing hospitality UI, zero decorative clutter, cinematic fidelity.
```

---

### 🧾 PANTALLA 4: Unified Table Comanda Drawer (Slide-Over Ticket Review)
> **Parámetros:** `projectId: "9234498351317745527"`, `deviceType: "MOBILE"`, `modelId: "GEMINI_3_1_PRO"`

```text
A luxury mobile slide-over bottom sheet drawer for a fine-dining unified table order (Comanda de Mesa). Deep obsidian background with heavy backdrop blur (32px). 

Top sheet handle bar in brushed champagne gold. Header displays 'Table 14 • Kitchen Order' in editorial serif, with a status pill 'Draft • 3 Creations'. 

List of selected dishes: each row features a crisp rounded-xl food thumbnail, dish title in serif, custom chef preparation notes rendered in delicate italic gold text ('Medium-rare • Sauce on the side'), quantity adjustment controls ([-] 2 [+]), and individual price. 

Bottom fixed summary module: elegant breakdown lines for Subtotal, Service charge (10%), and Grand Total in large champagne gold numerals. Primary full-width CTA button in glowing champagne gold: 'Send Consolidated Order to Kitchen' with a subtle haptic feedback indicator. Elegant, dark, friction-free.
```
