# AGENTS.md — instrucciones del portfolio (compartidas entre agentes)

## Objetivo

Este repositorio es una plantilla didáctica para una masterclass de IA aplicada al desarrollo web.
La persona participante debe personalizar un portfolio one-page sin necesidad de reescribirlo entero.

## Fuentes de verdad y arquitectura

- `src/data/config.json`: nombre, profesión, biografía, competencias, contacto y paleta.
- `src/data/projects.json`: lista de proyectos; `isExample: true` identifica una ficha ficticia.
- `src/app.js`: renderizado de datos y comportamiento del menú.
- `src/styles.css`: diseño responsive.
- `index.html`: documento principal y estructura semántica.
- `docs/visual-spec.md` y `references/portfolio.png`: referencia de diseño orientativa, no contenido que copiar.

**Regla esencial:** los JSON son la fuente de verdad para los datos personales. Si un usuario facilita sus datos, cambia esos JSON. No inventes experiencia, enlaces, formación, resultados ni proyectos. No publiques los ejemplos como si fueran reales.

## Criterios técnicos

1. Mantén el stack HTML + CSS + JavaScript + Vite. Sin frameworks ni dependencias nuevas salvo necesidad aprobada.
2. Conserva las secciones: navegación, presentación, proyectos, competencias, contacto y pie.
3. Genera las tarjetas a partir de `projects.json`; no dupliques contenido manualmente.
4. Cuida HTML semántico, contraste, teclado, foco visible, enlaces y menús accesibles.
5. Comprueba 375, 768 y 1440 px si tienes navegador. Si no, informa de que no hiciste verificación visual.
6. Haz cambios pequeños. Explica las decisiones antes de modificaciones grandes.
7. Ejecuta `npm run check` y `npm run build` después de cambios relevantes, cuando sea posible.
8. Un check estático no equivale a una auditoría WCAG completa. No declares conformidad sin pruebas.

## Seguridad y control humano

- No hagas `git add`, `commit`, `push`, merges, releases ni despliegues sin permiso explícito.
- No uses `git push --force` ni elimines archivos ajenos sin aprobación.
- No incluyas claves API, tokens, datos privados, secretos ni ficheros `.env` en commits.
- Antes de instalar paquetes, ejecutar comandos que cambian el sistema o contactar servicios externos, explica qué harás y solicita permiso cuando corresponda.
- No inventes resultados de herramientas ni pruebas.

## Forma de trabajo del agente

1. Lee el objetivo del usuario y solo los archivos necesarios (economía de contexto).
2. Resume el plan en 2-4 pasos.
3. Aplica el cambio más pequeño útil.
4. Valida con las herramientas disponibles e indica qué no pudiste comprobar.
5. Muestra un resumen de archivos modificados, comprobaciones y siguientes pasos.
6. No incluyas nunca claves privadas, tokens, claves API ni secretos en el código ni en los mensajes.
7. Añade los cambios al changelog con metodología basada en keep a changelog

## Material de aprendizaje

- Prompts reutilizables: `.github/prompts/*.prompt.md` (VS Code/Copilot).
- Skills reutilizables: `.agents/skills/*/SKILL.md` (Copilot, Gemini y Antigravity).
- Herramienta local de terminal: `npm run check`.
- Herramientas MCP de solo lectura: `tools/portfolio-mcp.mjs`, conectadas a Copilot mediante `.vscode/mcp.json`.
- Claves de modelos para Continue: `.env` (no versionado; plantilla en `.env.example`).

En tareas de accesibilidad, SEO o publicación, usa la skill adecuada. No cargues todas las skills en cada petición si no son necesarias.
