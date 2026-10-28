---
name: vibe-coding
description: Construye el portfolio personal desde cero mediante vibe coding a partir de los datos en src/data/ (config.json y projects.json), index.html y src/styles.css. Usar cuando la alumna pida crear la web, generar el HTML, los estilos o la lógica.
---

# Skill — Vibe Coding del Portfolio

## Alcance y fuentes de verdad
- **Datos de origen:** `src/data/config.json` (nombre, titular, bio, competencias, enlaces y paleta de colores) y `src/data/projects.json` (proyectos).
- **Referencia visual:** `docs/visual-spec.md` y `references/portfolio.png`.
- **Archivos a generar/modificar:** `index.html`, `src/styles.css` y `src/app.js`.

## Procedimiento paso a paso

### Paso 1: Estructura HTML Semántica (`index.html`)
1. Genera un documento accesible con `lang="es"`.
2. Incluye `<header class="site-header">` con logo (iniciales con punto) y botón `.menu-toggle` accesible (`aria-expanded="false"`, `aria-controls="primary-navigation"`).
3. `<main>` con exactamente un único `<h1>` descriptivo en la sección `#inicio` (Hero).
4. Secciones: `#proyectos` (con contenedor `[data-projects]`), `#competencias` (con `[data-skills]` y `[data-profile="about"]`) y `#contacto` (con enlaces a email, GitHub y LinkedIn).
5. `<footer>` accesible y enlace `<script type="module" src="/src/app.js"></script>`.

### Paso 2: Estilos CSS y Tokens (`src/styles.css`)
1. Genera las variables en `:root` extrayendo los colores de `config.json` (`--color-background`, `--color-surface`, `--color-text`, `--color-muted`, `--color-accent`), tipografía sans-serif y escalas de espaciado.
2. Añade un reset limpio y foco visible `:focus-visible` accesible.
3. Maqueta el layout centrado (`.page-shell` con ancho máximo ~1140px).
4. Diseña una cuadrícula con CSS Grid moderna para las tarjetas de proyectos con efectos hover sutiles.
5. Diseña los chips de competencias y botones.
6. Añade soporte responsive completo mediante `@media (max-width: 768px)`.

### Paso 3: Renderizado y Lógica (`src/app.js`)
1. Importa `./styles.css`, `config.json` y `projects.json`.
2. Actualiza `document.title`, las iniciales de marca y los textos del perfil en el DOM.
3. Recorre `projects` y genera dinámicamente cada tarjeta de proyecto dentro de `[data-projects]`.
4. Renderiza los chips de habilidades en `[data-skills]`.
5. Implementa la apertura/cierre del menú móvil con `aria-expanded` y cierre accesible al pulsar `Escape`.

## Verificación
Al terminar cada fase, sugiere a la alumna ejecutar:
```bash
npm run check
npm test
npm run build
```
para confirmar que no hay errores y que la web cumple los criterios básicos.
