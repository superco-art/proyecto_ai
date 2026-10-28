# Registro de cambios

Todas las modificaciones notables de este proyecto se documentan en este archivo según la metodología [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).

## [1.1.0] - 2026-10-26

### Añadido
- Conexión de la herramienta MCP a VS Code mediante `.vscode/mcp.json`.
- Guía interactiva descargable `docs/preparacion.html` compilada como página multipágina en Vite para su publicación en GitHub Pages.
- Plantilla segura `.env.example` y soporte de secretos `${{ secrets.NOMBRE }}` en Continue (`config.yaml`).
- Configuración multimodelo en Continue optimizada para modelos abiertos con Groq (`qwen/qwen3.8-27b`) y modelos especializados libres de OpenRouter (Nemotron Ultra, North Mini Code, Flint, Nemotron Super VL y Nemotron Lightning).
- Clarificación de Google Antigravity como IDE completo descargable para experimentar con Gemini 3.8 Flash de forma nativa e integrada sin claves API.
- Enlace de contacto y soporte técnico directo (`info@enriqueteruel.com`) en `config.json`, `preparacion.html` y `README.md`.

### Modificado
- `vite.config.js` actualizado para emitir tanto `index.html` como `docs/preparacion.html` en el build de producción.
- `README.md`, `docs/preparacion.html`, `tools/README.md` y `src/data/config.json` depurados de fórmulas y muletillas lingüísticas artificiales (eliminación de vaguedades como "ecosistemas digitales" o metáforas grandilocuentes, eliminación de emojis superfluos y redacción técnica directa).
- Coherencia total de etiquetas: Copilot como **Obligatorio**, Google Antigravity IDE como **Recomendado**, y Continue / Groq / OpenRouter como **Opcional**.

### Corregido
- Eliminadas rutas a carpetas y archivos obsoletos (`.gemini/`, `.mcp.json`, `docs/auditoria-manual.md`).
- Sincronizados los nombres exactos y verificados de los modelos con las APIs en vivo de Groq y OpenRouter.

## [1.0.0] - 2026-10-22

### Añadido
- Plantilla visual inicial de portfolio one-page con Vite y datos en `src/data/`.
