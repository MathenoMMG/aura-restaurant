---
name: Aura Gastronomique — Haute Couture Digital Dining System
colors:
  surface: '#08090A'
  surface-dim: '#060708'
  surface-bright: '#141619'
  surface-container-lowest: '#040506'
  surface-container-low: '#0D0F12'
  surface-container: '#121519'
  surface-container-high: '#1A1E24'
  surface-container-highest: '#222730'
  on-surface: '#F4F4F5'
  on-surface-variant: '#9FA4AD'
  inverse-surface: '#F4F4F5'
  inverse-on-surface: '#0D0F12'
  outline: '#2A303C'
  outline-variant: '#1B1F27'
  surface-tint: '#E5C378'
  primary: '#E5C378'
  on-primary: '#08090A'
  primary-container: '#1F1A0E'
  on-primary-container: '#F6E6B8'
  inverse-primary: '#08090A'
  secondary: '#C7A75C'
  on-secondary: '#08090A'
  secondary-container: '#2A2312'
  on-secondary-container: '#F0DFA8'
  tertiary: '#949BA8'
  on-tertiary: '#08090A'
  tertiary-container: '#16191E'
  on-tertiary-container: '#D2D7E0'
  error: '#FF6B6B'
  on-error: '#2C0B0B'
  error-container: '#3E1010'
  on-error-container: '#FFB8B8'
  primary-fixed: '#F6E6B8'
  primary-fixed-dim: '#E5C378'
  on-primary-fixed: '#251D08'
  on-primary-fixed-variant: '#524013'
  secondary-fixed: '#F0DFA8'
  secondary-fixed-dim: '#C7A75C'
  on-secondary-fixed: '#221B07'
  on-secondary-fixed-variant: '#4B3C11'
  tertiary-fixed: '#D2D7E0'
  tertiary-fixed-dim: '#949BA8'
  on-tertiary-fixed: '#121519'
  on-tertiary-fixed-variant: '#2C313C'
  background: '#08090A'
  on-background: '#F4F4F5'
  surface-variant: '#121519'
typography:
  display-lg:
    fontFamily: Syne
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Syne
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Syne
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Syne
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.18em
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 80px
  margin-mobile: 20px
---

# MANIFIESTO RECTOR DE DISEÑO: AURA GASTRONOMIQUE
**Directiva Técnica y Estética para Generación UI en Google Stitch**
*Basado en la convergencia estricta de `taste-skill`, `frontend-design`, `awesome-claude-design` (Editorial Minimalism & Cinematic Dark) y `ui-ux-pro-max`.*

---

## 1. INTENCIÓN DE MARCA, ATMÓSFERA Y PERSONALIDAD
Aura Gastronomique no es un catálogo de comida rápida ni una interfaz genérica de software. Es una plataforma digital de alta costura para hospitalidad gastronómica de élite (Michelin-level White-Label).

- **Tono Visual:** *Architectural Cinematic Noir*. Sobrio, seguro, misterioso, impecable. La interfaz no grita; enmarca el arte culinario con precisión quirúrgica.
- **Atmósfera:** Fondo en carbón obsidiana mate (`#08090A` / `hsl(240, 10%, 4%)`), evitando el negro plano digital saturado `#000000`. La iluminación emana de la fotografía de los platos y de micro-reflejos satinados en oro champán (`#E5C378`), nunca de gradientes estridentes.
- **Relación con el Comensal:** Trato silencioso y reverente. Cero explicaciones infantiles, cero listas didácticas numeradas, cero jerga técnica redundante como *"Haute Cuisine in Three Dimensions"*.

---

## 2. PROHIBICIONES TAXATIVAS Y DIRECTIVAS ANTI-SLOP
*Cualquier diseño que viole estos puntos será descartado automáticamente.*

1. **PROHIBIDO EL USO DE EMOJIS (CRÍTICO):**
   - Jamás utilizar emojis (como 🔮, 🌱, 🌾, ⭐, 🚀, 🍷, 🔔) en la interfaz gráfica, botones, badges, filtros ni navegación.
   - Todo glifo visual debe ser un icono vectorial SVG lineal de trazo fino (0.75px a 1.25px stroke) monocromático o en oro champán satinado.
2. **PROHIBIDO EL ABUSO DE PILLS (`border-radius: 9999px` en todo):**
   - Los botones con forma de píldora redonda masiva son un cliché de 2021.
   - Geometría estricta: Usar esquinas arquitectónicas contemporáneas:
     * Contenedores mayores, tarjetas y modales: `border-radius: 12px` a `16px`.
     * Botones y controles de acción: `border-radius: 6px` a `8px` con bordes nítidos.
     * Pestañas y filtros: Superficies rectangulares con micro-bordes o navegación basada en texto con micro-indicador de línea inferior de 1px.
     * La única excepción para bordes redondeados completos (`rounded-full`) son los micro-contadores numéricos o cápsulas de estado de servicio discretas.
3. **PROHIBIDOS LOS ONBOARDINGS DIDÁCTICOS Y LECTURAS DE TEXTO INICIALES:**
   - La pantalla de bienvenida a mesa debe ser una portada de alta costura: logotipo/monograma enigmático, identificador sereno de mesa (`SALÓN PRINCIPAL · MESA 14`) y un único umbral de entrada (`ENTRAR AL MENÚ`).
   - Cero listas con viñetas *"Paso 1: Mira el menú, Paso 2: Escanea AR"*.
4. **PROHIBIDAS LAS SOMBRAS DIFUSAS GENÉRICAS:**
   - No usar `box-shadow: 0 4px 6px rgba(0,0,0,0.1)`.
   - La profundidad se crea mediante elevación tonal de superficies en capas HSL y bordes de luz interior (*specular highlight*): `border: 1px solid rgba(255, 255, 255, 0.06)` y sombra multicapa calibrada: `box-shadow: 0 8px 32px -4px rgba(0, 0, 0, 0.7)`.
5. **PROHIBIDA LA TIPOGRAFÍA PESADA O CLICHÉ (BODONI MODA / INTER / ROBOTO):**
   - Descartar fuentes de catálogo anticuado. La jerarquía se rige por:
     * **Display & Headings:** `Syne` (o `Bricolage Grotesque`) en pesos 600-700, con espaciado entre letras óptico ajustado (`-0.02em`).
     * **Body, Subtítulos y Acciones:** `Plus Jakarta Sans` en peso 400-500.
     * **Precios y Datos Cuantitativos:** Cifras monoespaciadas (`tabular-nums`) para legibilidad financiera impecable.

---

## 3. SISTEMA DE COMPONENTES Y ESTRUCTURA POR VISTAS

### A. Pantalla 1: Portada de Entrada de Mesa (Table Welcome Landing)
- **Viewport:** Móvil 390×844px.
- **Composición:** Composición vertical de póster cinematográfico.
  - **Header Superior:** Monograma lineal ultra-delicado `AURA` centrado o a la izquierda. Selector de idioma minimalista en texto sobrio (`EN · ES`).
  - **Bloque Central:** Identificador de mesa discreto grabado en vidrio ahumado con micro-borde de 1px: `MESA 14 · SALÓN PRINCIPAL`.
  - **Tipografía Display:** Título conciso y editorial: `AURA GASTRONOMIQUE` o `MENÚ DE TEMPORADA`. Subtítulo monocromático sutil: `Una exploración sensorial del origen y la materia.`
  - **CTA Principal Inferior:** Botón arquitectónico rectangular con micro-borde de 6px en oro champán satinado mate (`#E5C378` con tipografía obsidiana en `label-caps`): `EXPLORAR CARTA`.

### B. Pantalla 2: Feed Principal del Menú Móvil
- **Top Sticky Header:** Vidrio ahumado oscuro con `backdrop-filter: blur(24px)` y borde inferior de 1px (`rgba(255,255,255,0.06)`). Muestra monograma `AURA`, etiqueta discreta de mesa activa y acceso al drawer de comanda con contador tipográfico nítido.
- **Categorías Gastronómicas:** Navegación horizontal deslizante. En lugar de pills bulbosas, usar etiquetas de texto en mayúsculas (`label-caps`) separadas con amplio espaciado, donde la categoría activa se destaca con un micro-guion o línea inferior en oro champán de 1.5px.
- **Filtros de Precisión (Dieta y WebAR):**
  - Ubicados bajo las categorías.
  - Formato: Micro-selectores rectangulares biselados (`rounded: 6px`, borde fino de 1px `rgba(255,255,255,0.1)`).
  - Texto limpio: `VISOR AR 1:1`, `PLANT-BASED`, `SIN GLUTEN`, `SELECCIÓN CHEF`.
  - Iconos: Exclusivamente líneas vectoriales SVG de 12px (cubo isométrico limpio para AR, hoja lineal para plant-based).
- **Tarjetas Gastronómicas:**
  - Acabado en pizarra carbón (`#0D0F12`), radio de curvatura calibrado de 14px.
  - Fotografía cenital enmarcada con viñeta sutil.
  - Badge flotante en vidrio translúcido: `3D · AR 1:1` con punto indicador de 4px en oro champán.
  - Título en `Syne` 600, descripción breve con acento en el origen del producto, precio en oro champán mate y botón de interacción dual: botón de texto técnico `[ VER EN MESA 3D ]` y botón cuadrado mínimo `[ + ]` para comanda.
- **Barra de Comanda Flotante:**
  - Anclada en la zona ergonómica del pulgar (*thumb zone*). Superficie oscura de vidrio esmerilado con micro-borde dorado superior. Muestra ítems agregados, subtotal exacto y flecha técnica minimalista hacia el drawer de comanda.

### C. Pantalla 3: Visor Inmersivo Full-Viewport HUD (100dvh) + Ficha Sensorial
- **Canvas AR/3D:** Cobertura absoluta de la pantalla móvil (100dvh).
- **Top Bar HUD Flotante:**
  - Botón circular de cierre `✕` de 44×44px en vidrio ahumado.
  - Conmutador central segmentado rectangular con esquinas suavizadas (4px): `[ ESTUDIO 360° ]` | `[ CÁMARA AR ]`.
  - Indicador técnico a la derecha: `ESCALA 1:1 · 320G`.
- **Ficha Sensorial Deslizable (Bottom Sheet):**
  - Superficie de cristal ahumado oscuro con tirador superior de oro cepillado.
  - Contenido ordenado por bloques de lectura espaciados:
    1. *Título y Valor:* Nombre en `Syne` y precio en tipografía monoespaciada oro.
    2. *Storytelling Noble:* 2-3 líneas sobre el linaje del ingrediente y método de maduración/cocción.
    3. *Maridaje del Sommelier:* Bloque rectangular con micro-borde dorado que sugiere el vino y notas de cata con icono lineal de copa de cristal.
    4. *Transparencia de Alérgenos:* Fichas geométricas minimalistas con texto y glifo lineal SVG.
    5. *Notas al Chef:* Campo de texto estilizado de una línea.
    6. *Selector y Comanda:* Contador rectangular `[ - ] 1 [ + ]` y botón de alta presencia en oro champán mate.

### D. Pantalla 4: Drawer de Comanda Unificada (Ticket Consolidado)
- **Concepto:** Hoja de comanda editorial para mesa física.
- **Estructura:**
  - Encabezado formal: `COMANDA DE MESA 14` en `Syne` y estado `BORRADOR`.
  - Filas de productos con miniatura cuadrada de 48px, tipografía nítida, especificaciones de cocción en cursiva dorada tenue y control de cantidades.
  - Desglose contable claro: Subtotal, Servicio y Total general.
  - CTA definitivo de un solo toque: `ENVIAR COMANDA A COCINA` con respuesta háptica.

---

## 4. ESTÁNDARES TÉCNICOS Y MICRO-INTERACCIONES
1. **Curvas de Movimiento:** Springs elásticos suaves exclusivamente para elementos táctiles (`active: scale(0.98)`). Las transiciones de paneles y modales emplean `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out de alta gama).
2. **Duración:** Micro-interacciones entre 150ms y 250ms. Nunca transiciones lentas que den sensación de pesadez.
3. **Accesibilidad y Contraste:** Ratio de contraste mínimo de 4.5:1 en todos los textos secundarios sobre fondo carbón mediante `--on-surface-variant` (`#9FA4AD`).
4. **Respeto a Áreas Seguras:** Separación garantizada para el notch y barra de navegación inferior de iOS/Android (`env(safe-area-inset-top)` y `env(safe-area-inset-bottom)`).
