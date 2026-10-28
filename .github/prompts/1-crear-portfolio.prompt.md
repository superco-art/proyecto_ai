---
description: "Paso 1: Generar todo el portfolio desde cero a partir de src/data/"
agent: agent
---

Lee la información en `src/data/config.json`, `src/data/projects.json` y la referencia visual en `docs/visual-spec.md`.

Construye mi portfolio web completo mediante vibe coding:
1. En `index.html`: genera la estructura semántica y accesible (<header>, <nav>, hero con un único <h1>, secciones de proyectos, competencias, contacto y <footer>).
2. En `src/styles.css`: genera los estilos CSS usando los colores de `config.json`, tipografía moderna, reset accesible con :focus-visible y diseño responsive para móvil.
3. En `src/app.js`: importa los estilos y los JSON, inyecta los datos dinámicamente en el DOM y programa el menú móvil accesible.
