# Aura Gastronomique — Estado Actual y Guía de Showcase

> **Plataforma WebAR 1:1, Ficha Sensorial y Comanda Unificada de Alta Cocina**  
> *Documento vivo del estado del desarrollo, características funcionales y guía para demostración y evaluación.*

---

## 1. Enlaces Oficiales y Acceso Rápido

* 🌐 **URL de Producción en Vivo (HTTPS):** [https://aura-gastronomique.netlify.app](https://aura-gastronomique.netlify.app)
* 🐙 **Repositorio GitHub con CI/CD:** [https://github.com/MathenoMMG/aura-restaurant](https://github.com/MathenoMMG/aura-restaurant)
* ⚙️ **Hosting & Edge Functions:** Netlify (Proyecto: `aura-gastronomique`, Site ID: `e4cd07eb-43b0-422c-96a3-01bdbe7c0342`)
* 📦 **Rama de despliegue continuo:** `master` (cualquier commit compila y publica en caliente de forma autónoma).

---

## 2. Mapa Completo de Pantallas y Funcionalidades Activas

### Pantalla 1: Welcome & Asignación de Mesa (`WelcomeTemplate.tsx`)
* **Fondo Cinemático Orgánico:** Integración de curvas topográficas SVG multicapa inspiradas en **Haikei**, con gradientes satinados carbón/dorado y penumbra ambiental que eliminan el aspecto de "fondo negro plano".
* **Animaciones Orquestadas con GSAP:** Entrada secuencial con física `power3.out` del resplandor de fondo, la cabecera, la chapa de mesa (`SALÓN PRINCIPAL • Mesa 14`), el título *SEASONAL CURATION* con degradado metálico y el botón flotante con elevación.
* **Selectores de Idioma:** Botones para conmutar entre español e inglés.

### Pantalla 2: Feed Principal de Carta de Temporada (`MenuTemplate.tsx`)
* **Cabecera Haute Couture Despejada:** Sin bloques de texto invasivos ni etiquetas ruidosas.
* **Pestañas de Navegación Editorial con Micro-subrayado:**
  * `TODA LA CARTA`
  * `ENTRANTES`
  * `PRINCIPALES`
  * `DULCES`
  * `BODEGA & CAVA`
* **Filtros Geométricos Biselados (6px):**
  * `AR VIEW 1:1`: Filtra instantáneamente únicamente los platos que cuentan con modelo tridimensional y soporte WebAR.
  * `PLANT-BASED`: Filtra opciones vegetarianas o veganas.
* **Tarjetas de Platos Minimalistas (`DishCard.tsx`):**
  * Fotografía de alta definición con viñeta inferior y efecto hover zoom sutil (700ms).
  * Micro-indicador discreto `3D` (sin textos intrusivos ni badges genéricos).
  * Tiempo de preparación en cocina (`22 MIN`, `14 MIN`).
  * Tipografía arquitectónica `Syne` para nombres de platos y `Plus Jakarta Sans` para descripciones de técnica e ingredientes.
  * Precio en tipografía tabular monospaciada (`tabular-nums`) para evitar saltos visuales.
  * Botón directo de adición a la comanda (`+`) y botón `VER EN MESA` que abre la experiencia inmersiva.

### Pantalla 3: Visor Inmersivo Full-Viewport HUD 100dvh (`FullViewportViewer.tsx`)
* **Flujo Corregido "Fotografía Primero":** Al hacer clic en un plato, la aplicación presenta primero la **fotografía editorial del plato en alta definición**, evitando cargas innecesarias de 3D.
* **Selector Dinámico `[FOTOGRAFÍA]` vs `[360° ESTUDIO]`:** Si el plato posee modelo 3D, el comensal puede alternar fluidamente entre la foto o inicializar el lienzo interactivo tridimensional.
* **Visor 3D Interactivo:**
  * Rotación orbital 360° táctil y pellizco para zoom.
  * Auto-rotación suave a 15°/s con iluminación ambiental de estudio culinario.
* **WebAR 1:1 Calibrado para Mesa Física:**
  * `ar-placement="floor"`: Fuerza al sensor AR (SLAM) de iOS y Android a anclar el plato al plano horizontal de la mesa, impidiendo que el objeto flote o pierda la perspectiva al elevar o mover el teléfono.
  * `ar-scale="fixed"`: Bloquea la escala en proporción 1:1 realista para que el comensal aprecie el tamaño exacto de la vajilla.
  * Soporte multiplataforma automático: **QuickLook (.usdz)** en iPhone Safari y **SceneViewer / WebXR (.glb)** en Android Chrome.
  * Botón de activación directa `activateAR()` para lanzamiento instantáneo de cámara.
* **Ficha Sensorial y Maridaje:** Indicador de gramaje/volumen (`320g`), maridaje recomendado por el sumiller (ej. *Malbec Gran Reserva 2018*) y notas de origen.
* **Instrucciones Especiales a Cocina:** Campo de texto interactivo para que el comensal especifique términos de cocción, intolerancias o notas especiales.
* **Selector de Porciones y Botón de Comanda:** Ajuste numérico `[-] 1 [+]` y botón reactivo con feedback visual de confirmación inmediata.

### Pantalla 4: Drawer de Comanda de Mesa (`CartDrawer.tsx`)
* Panel lateral flotante con desenfoque de fondo (*backdrop-blur*).
* Desglose de platos seleccionados, fotografías en miniatura, notas personalizadas del comensal y ajustes de cantidad.
* Eliminación rápida de ítems y cálculo de total en tiempo real.
* Botón destacado `CONFIRMAR COMANDA A COCINA` que simula la emisión del ticket directo a la estación de cocina.
* **Persistencia Offline con Zustand:** Los platos agregados a la comanda se conservan en el `localStorage` del dispositivo aunque el usuario recargue o cierre el navegador.

### Pantalla 5: Terminal Gerencial / Analytics de Restaurante (`AdminTemplate.tsx`)
* Panel de administración accesible desde el icono gerencial de la cabecera.
* Métricas en tiempo real:
  * **Visualizaciones 3D / AR:** Conteo acumulado de comensales que proyectaron el plato.
  * **Comandas Emitidas:** Volumen de órdenes generadas.
  * **Tasa de Conversión 3D → Pedido:** Ratio porcentual que demuestra el impacto del WebAR en la venta.
* **Conmutadores de Disponibilidad en Vivo:** Switches interactivos para activar o pausar platos agotados en cocina, reflejándose al instante en la carta del comensal.

---

## 3. Catálogo de Platos Precargado

1. **Wagyu A5 Glaseado al Oporto (Plato Insignia con 3D / WebAR Activo)**
   * Medallón premium sellado a la brasa con emulsión de tuétano ahumado, microbrotes y láminas de papa trufada.
   * Modelo 3D / WebAR 1:1 verificado.
   * Maridaje: Malbec Gran Reserva 2018 | 48.00 €
2. **Risotto de Setas Silvestres y Trufa (Plant-Based con 3D / WebAR)**
   * Arroz Acquerello envejecido con boletus edulis salteados, lascas de Reggiano y aceite de trufa blanca.
   * Maridaje: Chardonnay Fermentado en Barrica | 32.00 €
3. **Tártaro de Atún Rojo Balfegó (Entrante con 3D / WebAR)**
   * Lomo de atún rojo picado a cuchillo, emulsión de aguacate Hass, alga nori deshidratada y caviar cítrico.
   * Maridaje: Champagne Brut Nature | 36.00 €
4. **Carpaccio de Remolacha & Queso de Cabra (Entrante Plant-Based)**
   * Láminas finas de remolacha ecológica a baja temperatura, medallones de queso Sainte-Maure y pistachos de Bronte.
   * 24.00 €
5. **Esfera de Cacao 72% Humo de Roble (Postre con 3D / WebAR)**
   * Esfera crujiente de chocolate Valrhona rellena de mousse de café arábica y corazón de caramelo salado.
   * 19.00 €
6. **Cóctel Nebulosa de Romero y Saúco (Coctelería de Autor)**
   * Gin botánico con licor St-Germain, tónica artesanal y burbuja de humo aromático que se disuelve en mesa.
   * 18.00 €

---

## 4. Guía de Demostración en Dispositivo Móvil

Para presentar o probar el proyecto:
1. Conéctate a internet en tu teléfono y accede a [https://aura-gastronomique.netlify.app](https://aura-gastronomique.netlify.app).
2. Observa la animación de entrada suave orquestada con **GSAP** y el fondo con ondas orgánicas **Haikei**.
3. Haz clic en **"EXPLORAR CARTA"**.
4. Pulsa sobre **Wagyu A5 Glaseado al Oporto**:
   * Observarás primero la fotografía gastronómica con los detalles de maridaje.
   * Pulsa el botón **"ACTIVAR VISTA 360° & AR"** o el switch superior para ver el modelo girar en 3D.
   * Pulsa el botón dorado **"PROYECTAR EN MESA"**: el teléfono abrirá la cámara; apunta hacia la superficie plana de la mesa y verás el objeto anclarse firmemente en perspectiva horizontal gracias a `ar-placement="floor"`.
5. Ajusta unidades, escribe una nota a cocina y agrégalo a la comanda.
6. Abre la comanda, verifica los totales y confirma el pedido.
