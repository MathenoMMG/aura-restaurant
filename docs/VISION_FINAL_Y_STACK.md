# Aura Gastronomique — Visión Final, Arquitectura & Stack Tecnológico

> **Manifiesto de Ingeniería, Hoja de Ruta de Producto & Ecosistema de Herramientas**  
> _Especificación de lo que el proyecto debe ser en su estado maduro definitivo y el ecosistema técnico implementado._

---

## 1. Visión Holística del Producto Final

Aura Gastronomique no es un simple menú digital en PDF ni un catálogo estático; es una **plataforma integral de experiencia culinaria y comanda unificada multi-inquilino (White-Label)** orientada a la alta cocina internacional, restaurantes con estrellas Michelin y bistrós de vanguardia.

### Pilares de la Experiencia Final:

1. **Fricción Cero en Mesa (Web PWA Sin Descargas):** El comensal escanea un código QR en la mesa física y accede en menos de 1.2 segundos sin descargar ninguna app de la App Store o Google Play.
2. **WebAR 1:1 Hiperrealista:** El comensal puede proyectar el plato en su tamaño físico real sobre el mantel para apreciar la escala de la porción, la vajilla y la composición antes de ordenar, reduciendo la incertidumbre y elevando el ticket promedio.
3. **Ficha Sensorial Integral:** Información de origen de los ingredientes, notas de cata y maridaje del sommelier.
4. **Comanda Sincronizada en Tiempo Real (Mesa → Pase de Cocina):** Cuando los comensales de una mesa envían su orden, esta se consolida en un dashboard de cocina (_Kitchen Display System - KDS_) mediante WebSockets / Supabase Realtime.
5. **Backoffice y Analítica para el Chef / Gerente:** Métricas exactas de cuántas veces se visualizó cada plato en 3D, tiempo de permanencia, embudo de conversión a pedido y gestión de inventario/agotados en caliente.

---

## 2. Ecosistema de Herramientas y Stack Tecnológico (Tools & Libraries)

| Capa / Dominio                 | Herramienta / Tecnología    | Enlace Oficial                                                     | Propósito y Función en el Proyecto                                                                                                            |
| :----------------------------- | :-------------------------- | :----------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| **Motion & Líneas de Tiempo**  | **GSAP (GreenSock)**        | [https://gsap.com/](https://gsap.com/)                             | Estándar de la industria para animaciones ultra fluidas a 60–120 FPS, transiciones cinemáticas con física `power3.out` y entrada orquestada.  |
| **Generador de Fondos SVG**    | **Haikei App**              | [https://haikei.app/](https://haikei.app/)                         | Generación de texturas vectoriales SVG multicapa, dunas y curvas topográficas oscuras con gradientes para fondos inmersivos de bajo peso.     |
| **Modelado & Escenas 3D**      | **Spline 3D**               | [https://spline.design/](https://spline.design/)                   | Plataforma web para diseñar, texturizar e iluminar los modelos 3D de la vajilla y exportar directamente los archivos `.glb` optimizados.      |
| **Visor 3D & WebAR Nativo**    | **Google Model Viewer**     | [https://modelviewer.dev/](https://modelviewer.dev/)               | Motor WebGL/WebXR que activa la cámara sin instalar apps; integra **Apple QuickLook** (`.usdz`) en iOS y **SceneViewer** (`.glb`) en Android. |
| **Framework Web Principal**    | **Next.js 16 (App Router)** | [https://nextjs.org/](https://nextjs.org/)                         | Framework React con compilador Turbopack, App Router y arquitectura lista para producción de alta demanda.                                    |
| **Biblioteca de UI**           | **React 19**                | [https://react.dev/](https://react.dev/)                           | Capa de componentes reactivos, hooks modernos y concurrencia.                                                                                 |
| **Tipado Estricto**            | **TypeScript 5**            | [https://www.typescriptlang.org/](https://www.typescriptlang.org/) | Tipado exhaustivo de platos, comandas, opciones dietéticas y modelos relacionales.                                                            |
| **Motor de Estilos**           | **Tailwind CSS v4**         | [https://tailwindcss.com/](https://tailwindcss.com/)               | Motor CSS compilado en Rust con soporte nativo de variables CSS y diseño _Dark Gourmet Minimalist_.                                           |
| **Gestión de Estado**          | **Zustand 5**               | [https://zustand-demo.pmnd.rs/](https://zustand-demo.pmnd.rs/)     | Estado global reactivo para la comanda y filtros con middleware `persist` en `localStorage`.                                                  |
| **Base de Datos & Backend**    | **Supabase**                | [https://supabase.com/](https://supabase.com/)                     | Backend PostgreSQL 15, autenticación RBAC, WebSockets Realtime y Storage CDN de assets multimedia.                                            |
| **Hosting & Despliegue CI/CD** | **Netlify**                 | [https://www.netlify.com/](https://www.netlify.com/)               | Despliegue continuo desde GitHub con conexión HTTPS obligatoria para la cámara WebAR.                                                         |
| **Iconografía Minimalista**    | **Lucide React**            | [https://lucide.dev/](https://lucide.dev/)                         | Set de iconos vectoriales limpios y técnicos sin emojis (_anti-slop_).                                                                        |
| **Animaciones React**          | **Framer Motion**           | [https://motion.dev/](https://motion.dev/)                         | Micro-interacciones táctiles tipo spring para botones y modales.                                                                              |

---

## 3. Arquitectura del Backend Relacional (Supabase PostgreSQL)

El backend en `supabase/migrations/01_initial_schema.sql` y `docs/supabase_schema.sql` cuenta con la siguiente arquitectura:

```mermaid
erDiagram
    RESTAURANTS ||--o{ CATEGORIES : contiene
    RESTAURANTS ||--o{ TABLES : dispone
    CATEGORIES ||--o{ DISHES : agrupa
    DISHES ||--o{ DISH_MEDIA : almacena_3d_y_fotos
    TABLES ||--o{ ORDERS : emite
    ORDERS ||--o{ ORDER_ITEMS : detalla
    DISHES ||--o{ ORDER_ITEMS : referencia
```

### Tablas Implementadas:

1. **`profiles`:** Usuarios con control de acceso basado en roles (`superadmin`, `owner`, `manager`, `chef`, `waiter`).
2. **`restaurants`:** Configuración del local, moneda (`€`, `$`), nombre y colores de acento (soporte multi-inquilino).
3. **`categories`:** Entrantes, Principales, Postres, Vinos, etc.
4. **`dishes`:** Platos con gramaje, tiempo de preparación, alérgenos y maridajes de sommelier.
5. **`dish_media`:** Soporte polimórfico para `.glb` (Android), `.usdz` (iOS QuickLook) y fotografías WebP.
6. **`tables`:** Asignación de mesas físicas (`Mesa 14`, `Terraza 02`) asociadas a códigos QR únicos.
7. **`orders` & `order_items`:** Registro de tickets de comanda con estado en tiempo real (`pending`, `in_preparation`, `delivered`, `closed`) y notas personalizadas del cliente.

---

## 4. Hoja de Ruta (Roadmap) hacia la Versión Final Definitiva

### Fase 1: Perfeccionamiento de la Experiencia Móvil & Visual (Completada ✅)

- [x] Landing de bienvenida cinemática con ondas orgánicas Haikei y GSAP.
- [x] Eliminación de textos intrusivos ("WebAR 1:1 inmersivo" y "AR Ready").
- [x] Flujo "Fotografía Primero" y activación de 3D/360° bajo demanda.
- [x] Fijación de modelo en mesa con `ar-placement="floor"` y `ar-scale="fixed"`.
- [x] Despliegue en producción con HTTPS en Netlify.

### Fase 2: Conexión Activa de Supabase en Tiempo Real (Siguiente Paso)

- [ ] Vincular variables de entorno `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- [ ] Migrar el almacén de datos de `menuData.ts` para que cargue los platos dinámicamente desde la tabla `dishes` de Supabase.
- [ ] Conectar el botón de "Confirmar Comanda" para que inserte la orden en las tablas `orders` y `order_items`.

### Fase 3: Kitchen Display System (KDS) & Panel de Sala

- [ ] Vista `/kitchen` para la pantalla de cocina, donde las órdenes ingresadas por los comensales aparezcan en tiempo real mediante `supabase.channel('public:orders')`.
- [ ] Cambio de estado del plato (En preparación -> Listo para servir) que notifique al camarero.

### Fase 4: Integración de Modelos 3D de Alta Fidelidad en Spline

- [ ] Modelado o fotogrametría de la vajilla y platos de la carta en Spline.
- [ ] Exportación de archivos gemelos (`.glb` optimizado a < 4MB para Android y `.usdz` para iOS).
- [ ] Alojamiento en el bucket `menu-media` con cabeceras de caché inmutables.
