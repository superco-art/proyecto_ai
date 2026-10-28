# Instrucciones para GitHub Copilot

Lee `AGENTS.md` para las reglas generales y `docs/visual-spec.md` para los criterios gráficos.

- Personaliza primero `src/data/config.json` y `src/data/projects.json`.
- No reemplaces la web por una solución nueva sin una petición explícita.
- No inventes perfil, proyectos, enlaces, resultados de auditorías ni datos de contacto.
- La plantilla contiene **proyectos ficticios** identificados con `isExample: true`.
- Comprueba accesibilidad, responsive y compilación con las herramientas disponibles.
- Solicita aprobación humana antes de commits, pushes y publicación.

Prompts listos para usar: `.github/prompts/`.
Skills compartidas con Gemini CLI y Antigravity: `.agents/skills/`.
Herramienta local: `npm run check` o `auditar_portfolio` vía MCP si está conectado.
