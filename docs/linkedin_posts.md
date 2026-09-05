# LinkedIn Technical Posts — Estrategia de Marca e Ingeniería

Este documento contiene dos propuestas de publicaciones de alto nivel técnico para el perfil de LinkedIn de **Mathew Ospino Hernandez**, diseñadas para destacar rigor en ingeniería, decisiones arquitectónicas y diseño de interfaces sin jerga vacía.

---

## Opción 1: Lanzamiento y Arquitectura de `Parleró`
**Objetivo:** Mostrar dominio de producto end-to-end, Next.js 16, TypeScript, persistencia cloud silenciosa con Supabase y resolución de problemas reales en el ámbito del Politecnico di Torino.

```markdown
Aprender un idioma bajo la presión de un examen oficial universitario no debería depender de fotocopias dispersas ni de PDFs de 200 páginas.

Durante mi preparación para el examen oficial de acreditación lingüística CLA A2 de italiano en el Politecnico di Torino, identifiqué una fricción constante entre los estudiantes internacionales: la falta de una herramienta digital moderna, estructurada y portátil que sintetizara el sillabo académico oficial (Dieci A2) con métricas reales de autoevaluación.

Por eso construí Parleró.

Más que una aplicación de estudio, el reto radicó en la arquitectura técnica:
1. Mobile-First & Latencia Cero: Construida sobre Next.js 16 (App Router), React 19 y Tailwind CSS v4. El diseño prioriza micro-interacciones táctiles nativas y feedback háptico/auditivo configurable para sostener el engagement.
2. Persistencia Híbrida Offline-First: Los estudiantes necesitan repasar en el metro o en trayectos sin conexión. Implementé Zustand con sincronización automática hacia Supabase/PostgreSQL en background, eliminando por completo la fricción de un registro o login forzado para empezar a estudiar.
3. Simulador de Examen en Tiempo Real: Algoritmo determinista de selección de preguntas bajo cronómetro estricto, emulando con fidelidad matemática el entorno de evaluación real del CLA PoliTo.
4. Diseño Editorial sin Distracciones: Soporte nativo para Dark & Light Mode respetando contraste WCAG AAA, con una jerarquía tipográfica limpia y contrastes gramaticales explicativos entre italiano y español.

El software de impacto no es el que acumula dependencias innecesarias, sino el que resuelve un dolor concreto con elegancia técnica y ejecución implacable.

El código es open-source bajo licencia MIT:
🔗 Repositorio: https://github.com/MathenoMMG/Parlero
🔗 Demo en vivo: https://parlero.netlify.app

¿Qué opinan de los modelos de persistencia silenciosa en aplicaciones educativas? Me encantaría leer sus comentarios y feedback técnico.

#NextJS #React #TypeScript #Supabase #TailwindCSS #SoftwareEngineering #PolitecnicoDiTorino #FullStack #EdTech #OpenSource
```

---

## Opción 2: Innovación WebAR e Interfaces Inmersivas con `Aura Gastronomique`
**Objetivo:** Demostrar capacidades de vanguardia en WebGL/WebXR, rendimiento en redes móviles 4G/5G, compresión 3D y diseño de sistemas de alta cocina.

```markdown
¿Por qué seguimos pidiendo comida en restaurantes de alta gama a través de menús en PDF estáticos o fotografías bidimensionales comprimidas?

En el sector gastronómico premium, la proporción, la textura y el cromatismo de un plato son parte esencial de la experiencia sensorial. Para llevar la alta cocina a tres dimensiones sobre la mesa física del comensal, desarrollé Aura Gastronomique.

El objetivo: una experiencia WebAR 1:1 mobile-first, sin descargas en App Store ni logins que interrumpan el servicio.

Desafíos de ingeniería superados en el desarrollo:
1. Full-Viewport HUD a 100dvh: Diseñé una arquitectura de interfaz donde el canvas 3D interactivo toma el 100% de la pantalla táctil, con overlays translúcidos de cristal flotante (Glassmorphism de 1px con blur dinámico) que garantizan legibilidad sobre cualquier iluminación de sala.
2. Compresión y Carga Instantánea (<1.2s LCP): Los modelos 3D pesados destruyen la conversión móvil. Optimizamos mallas con Draco Compression y Meshopt en formato binario .GLB, junto con posters WebP de precarga instantánea y soporte nativo USDZ QuickLook para dispositivos iOS.
3. Ficha Sensorial & Storytelling Sommelier: Cada creación culinaria integra su historia de origen de ingredientes nobles, alérgenos transparentes y sugerencia de maridaje de copa recomendada por sommelier.
4. Comanda Consolidada Unificada: Arquitectura de estado con Zustand persistente y backend PostgreSQL en Supabase, preparado para emitir tickets consolidados en tiempo real hacia el pase de cocina.

La tecnología web moderna ya permite difuminar la frontera entre el mundo digital y la mesa física.

🔗 Repositorio y Arquitectura: https://github.com/MathenoMMG/aura-restaurant

#WebAR #WebGL #ThreeJS #NextJS #TypeScript #TailwindCSS #UIUX #DesignSystems #TechInnovation #FrontendArchitecture
```
