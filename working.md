# working.md — Aura Gastronomique (WebAR 3D Restaurant & Comanda Unificada)

## Esquema actual

- **Stack:** Next.js 16.3.4 (App Router, Turbopack), React 19, Tailwind v4, Zustand 5 (persist), `@google/model-viewer` v4 vía CDN, Supabase (sin conectar), Netlify.
- **Rutas:** una sola (`src/app/page.tsx`). Alterna plantillas con `useState(hasEntered)` + flag `isAdminView` del store.
- **Flujo del comensal:** `WelcomeTemplate` → `MenuTemplate` (`HeaderNavbar` + tabs + `DishCard`) → `FullViewportViewer` (foto / 360° / AR) → `CartDrawer`. `AdminTemplate` aparte.
- **Datos:** mock en `src/data/menuData.ts`. Persistencia local en `aura-comanda-storage`.

## Design system (en transición)

- **Resto de la app (sin tocar):** Noir `#08090A`, Gold Satén `#E5C378`, Syne + Plus Jakarta Sans.
- **Pantalla de bienvenida (dirección "Servicio"):** fondo `#101010`, hueso `#F2EFE9`, cobre `#B8845F`.
  Display **Barlow Condensed** (`--font-condensed`), apoyo **JetBrains Mono** (`--font-tech`).
  Decidido tras comparar 4 tratamientos: opción 3 con el subtítulo de la 4.

## Qué hay (verificado con `next build` + `tsc --noEmit` en verde)

1. **Bienvenida reescrita** — `src/components/templates/WelcomeTemplate.tsx`
   - Su único trabajo es dar la bienvenida: marca, mesa, saludo y botón. Se eliminaron esquema de emplatado, gramaje, maridaje, datos de servicio, horario y "Carta de Otoño" (información que pertenece a otras pantallas).
   - `100dvh` + `env(safe-area-inset-*)`: antes usaba `min-h-screen` (`100vh`) y la barra de URL del móvil desplazaba el layout.
   - Entrada en **CSS** (`.aura-in` en `globals.css`), no en GSAP, con `prefers-reduced-motion`.
2. **Bugs del visor cerrados** — `src/components/organisms/FullViewportViewer.tsx`
   - Scroll-lock real del `body` al abrir (guarda y restaura `scrollY`) + `overscroll-none` y `role="dialog"`. Antes el gesto se propagaba al menú de detrás.
   - Eliminado el segundo botón "PROYECTAR EN MESA" duplicado en `top-4 right-4`, que tapaba al del `slot="ar-button"`, y el `handleTriggerAR` que quedó sin uso.
   - `ar-modes` reordenado a `scene-viewer webxr quick-look` + `xr-environment`: Scene Viewer usa anclaje ARCore nativo; WebXR caía a tracking 3DoF y el modelo derivaba al desplazarse lateralmente.
3. **Carta rediseñada** — `MenuTemplate.tsx`, `HeaderNavbar.tsx`, `DishCard.tsx`
   - Fuera la marca gráfica (el cuadro con la "A"): es una carta, no la home.
   - **Hero eliminado** ("CARTA DE TEMPORADA" + el párrafo sobre texturas y escala). Ocupaba el primer tercio de pantalla sin ayudar a elegir; las categorías pasan a ser lo primero.
   - Filtros: de rectángulos rellenos a texto conmutable con filete cobre.
   - `DishCard` deja de ser tarjeta: sin fondo, borde ni radio, separada por filete. Los chips (3D, CHEF SELECCIÓN, SIN GLUTEN, MIN) se funden en una línea mono: `320g · Sin gluten · Vista 3D`. Se retira la descripción larga (vive en el visor).
   - `Gestión` queda como texto discreto en vez de botón; sigue siendo la única vía de entrada al admin.
4. **Visor del plato rehecho** — `FullViewportViewer.tsx`
   - Reparto de pantalla según el plato: **con modelo 3D** los medios ocupan 58dvh (la vista del plato es la prioridad); **sin modelo** bajan a 34dvh y la ficha gana el espacio.
   - Los medios **se compactan al bajar** (sticky + alto interpolado por scroll, hasta 17dvh).
   - **Galería de fotos** con scroll-snap horizontal e indicador de posición (`gallery` nuevo en `Dish`).
   - Controles superiores reordenados: solo la X arriba a la izquierda; el conmutador Fotos / 360° y AR baja al pie de los medios, con degradado arriba y abajo para que se lea sobre fotos claras.
   - Ficha completa: nombre sin recortar, precio a 22px, gramaje, tagline, descripción, tabla Peso/Pase/Dieta, ingredientes, maridaje, origen y notas a cocina como campo con filete.
5. **Netlify conectado a GitHub con Autodeploy**:
   - Se vinculó el sitio `e4cd07eb-43b0-422c-96a3-01bdbe7c0342` (`aura-gastronomique`) con la GitHub App de Netlify bajo la instalación `74823193` (cuenta de GitHub `MathenoMMG/aura-restaurant`).
   - El sitio ahora escucha automáticamente cada push a la rama `master` para compilar y desplegar en caliente sin intervención manual.
6. **"Comanda" → "Pedido"** en toda la vista del comensal. En `AdminTemplate` se mantiene "Comandas Emitidas": ahí es terminología correcta de cocina.
7. **Drawer del pedido rehecho** — `CartDrawer.tsx`: cabecera con el mismo formato que la barra de la carta (título + mesa en mono), aire entre bloques, líneas sin recuadros.
8. **Tipografía** — `layout.tsx` carga Barlow Condensed y JetBrains Mono como variables adicionales; Syne/Jakarta siguen siendo los globales.

## Qué está fallando / pendiente

1. **AR en iOS sigue derivando.** `grep usdz src/data/menuData.ts` → 0 resultados: `ios-src` llega `undefined` y Quick Look, el único modo con anclaje sólido en iPhone, nunca entra. **Hay que subir un `.usdz` por plato.** Los `.glb` actuales son modelos de muestra (Astronaut, Burger) sin escala real.
2. **Recorrido con capturas incompleto.** Solo verificada la bienvenida. Faltan carta, visor de plato, visor 3D, drawer de comanda y admin. El panel del navegador devolvía capturas escaladas/en mosaico y clics fuera de sitio; repetir con la ventana en primer plano.
3. **`AdminTemplate` sin rediseñar**: única vista que sigue en la paleta antigua (Noir + Gold Satén + Syne).
4. **La galería son encuadres del mismo original.** `gallery` se generó con `crop=focalpoint` sobre la foto existente de cada plato — sirve para ver el comportamiento, pero hacen falta fotos reales distintas por plato.
4. **3 errores de ESLint preexistentes** en `FullViewportViewer.tsx`: un `any` en `viewerRef` y dos `react-hooks/set-state-in-effect`.
5. **Supabase sin conectar** y sin `.env.local`; falta ejecutar `01_initial_schema.sql`.

## Trampas conocidas del proyecto

- **Tailwind v4 — cascada:** en `globals.css`, una regla de elemento (`h1, h2, h3 {...}`) **fuera de `@layer`** gana a las utilidades `font-*` de `@layer utilities`. Costó un rato de depuración: `.font-condensed` existía y no se aplicaba. Ya envuelta en `@layer base`; mantenerla ahí.
- **Animaciones de entrada:** GSAP `.from()` escribe el estado inicial en el atributo `style`. Si el ticker no arranca (pestaña en segundo plano, rAF suspendido, fallo de carga), la pantalla queda **en blanco**. Preferir CSS para entradas simples.
