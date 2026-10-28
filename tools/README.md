# Herramientas del proyecto y servidor MCP

Este directorio contiene las herramientas de auditoría local y el servidor Model Context Protocol (MCP) del proyecto.

## Qué resuelve una herramienta MCP

Un modelo de lenguaje procesa y redacta texto, pero no ejecuta comprobaciones por sí mismo: no calcula ratios matemáticos de contraste WCAG, no valida si un archivo existe en disco ni comprueba si la estructura de un JSON cumple un esquema determinado.

Para que las revisiones sean precisas, este repositorio define herramientas en Node.js que el asistente puede invocar de forma determinista:

1. **Definición**: El archivo `tools/portfolio-mcp.mjs` implementa funciones como `auditar_portfolio` y `listar_proyectos`.
2. **Conexión**: El archivo `.vscode/mcp.json` registra el servidor local para que clientes compatibles (como GitHub Copilot en VS Code) descubran las herramientas automáticamente.
3. **Ejecución**: Cuando solicitas revisar el portfolio, el asistente consulta la herramienta correspondiente, recibe datos verificados del sistema de archivos y propone correcciones basadas en datos reales.

## Herramientas disponibles

- `auditar_portfolio`: Analiza la configuración de `src/data/config.json`, comprueba la existencia de archivos clave y evalúa contrastes de color según los umbrales WCAG AA.
- `listar_proyectos`: Lee `src/data/projects.json` y devuelve las fichas registradas, diferenciando las de muestra de las definitivas.

Para ejecutar la comprobación directamente desde la terminal sin intermediación del asistente:

```bash
npm run check
```
