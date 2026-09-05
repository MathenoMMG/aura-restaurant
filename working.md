# working.md - Aura Gastronomique (WebAR 3D Restaurant & Comanda Unificada)

## Esquema Completo Actual
- **Proyecto:** Aura Gastronomique (Alta cocina, WebAR 1:1, Ficha Sensorial y Comanda Unificada)
- **Ruta del Proyecto:** `c:\Users\matyo\Desktop\Projects\aura-restaurant`
- **Stack Técnico:** Next.js 16.3.4 (Turbopack, App Router), React 19, Tailwind CSS v4, Zustand 5 (persistente), `@google/model-viewer` v4 (WebAR / QuickLook USDZ / WebXR), Supabase (PostgreSQL + RLS + Storage) y Netlify.
- **Design System Haute Couture:**
  * Paleta: Noir Gourmet `#08090A`, Gold Satén `#E5C378`, Superficies `#0D0F12` / `#121519`, Tipografía Syne + Plus Jakarta Sans.
  * Pantalla 1: Welcome & Asignación de Mesa.
  * Pantalla 2: Feed Editorial de Carta con pestañas de micro-subrayado, filtros rectangulares y tarjetas biseladas.
  * Pantalla 3: Full-Viewport Viewer (100dvh) con proyección WebAR 1:1 a escala real, Ficha Sensorial y notas a cocina.
  * Pantalla 4: Drawer de Comanda Unificada con persistencia en localStorage.
  * Pantalla 5: Terminal Gerencial / Admin con métricas de conversión 3D/AR y toggles de disponibilidad en vivo.

## Qué hay (100% Funcional y Verificado)
1. **Frontend Móvil y Desktop**:
   - `src/app/layout.tsx`: Configurado con meta tags, fuentes y `viewport` óptimo para móvil (`viewportFit: 'cover'`, `userScalable: false`).
   - `src/app/globals.css`: Tokens cromáticos, tipográficos y clases utilitarias de glassmorphism.
   - `src/components/templates/WelcomeTemplate.tsx`: Landing de entrada minimalista.
   - `src/components/templates/MenuTemplate.tsx`: Menú interactivo con filtrado en tiempo real (categorías, AR 1:1, Plant-based).
   - `src/components/organisms/DishCard.tsx`: Tarjetas de platos con badges dinámicos, disparadores de WebAR y botón de comanda rápida.
   - `src/components/organisms/FullViewportViewer.tsx`: Visor 3D interactivo 360°, soporte QuickLook iOS (`ios-src`) y WebXR en Android, ficha sensorial con maridaje de sommelier y selector de cantidad.
   - `src/components/organisms/CartDrawer.tsx`: Carrito / Comanda con ajuste de cantidades, eliminación y resumen de totales.
   - `src/components/templates/AdminTemplate.tsx`: Dashboard de métricas (vistas 3D, comandas, tasa de conversión) y switches de stock.
   - `src/store/useComandaStore.ts`: Estado global reactivo con Zustand y persistencia offline (`localStorage`).
2. **Infraestructura y Base de Datos**:
   - `supabase/migrations/01_initial_schema.sql`: Esquema SQL completo con 6 tablas (`profiles`, `restaurants`, `dishes`, `dish_media`, `tables`, `orders`, `order_items`), Storage bucket `menu-media` y políticas RLS listas.
   - `netlify.toml`: Configuración de build, headers de seguridad y directivas de cámara para WebAR.
   - **Compilación de Producción:** Verificada con éxito (`npm run build` sin errores).

## Qué hace falta (Para producción y sincronización en la nube)
1. **Conexión Real con Supabase**:
   - Falta crear el proyecto en Supabase (o ingresar las credenciales en `.env.local` si ya existe).
   - Falta ejecutar `01_initial_schema.sql` en el SQL Editor de Supabase.
   - Falta instalar `@supabase/supabase-js` y conectar la carga de platos y envío de comandas con la base de datos remota (actualmente funciona de forma autónoma con datos mock de alta cocina en memoria y persistencia local).
2. **Despliegue a Netlify / Hosting**:
   - Conectar el repositorio de GitHub con Netlify o ejecutar despliegue para tener URL pública HTTPS (requerida por WebAR para acceder a sensores de giroscopio y cámara en iOS/Android).
3. **Modelos 3D y USDZ Propios**:
   - Los platos actuales cargan modelos de muestra remotos verificados. Para platos específicos del restaurante, subir los `.glb` y `.usdz` a Supabase Storage o a la carpeta `public/models/`.

## Qué está fallando
- **Ningún bug de código ni de compilación:** El proyecto compila limpiamente a producción y la suite de componentes responde con fluidez.
