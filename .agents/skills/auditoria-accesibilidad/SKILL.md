---
name: auditoria-accesibilidad
description: Analiza la accesibilidad de un portfolio HTML/CSS/JS y prepara hallazgos WCAG priorizados con evidencias. Usar al auditar el menú, contrastes, teclado, enlaces o semántica.
---

# Skill — Auditoría de accesibilidad del portfolio

## Alcance y referencias
Revisa `index.html`, `src/app.js`, `src/styles.css` y `src/data/*.json`. Usa WCAG 2.2 AA como orientación; no certifiques conformidad.

## Procedimiento
1. Revisa títulos, landmarks, `lang`, etiquetas y nombres accesibles.
2. Comprueba menú móvil: estado `aria-expanded`, acceso teclado, Escape, foco y cierre.
3. Evalúa contraste de texto y controles. Puedes usar `npm run check` o el MCP `auditar_portfolio`; el checker solo calcula los colores declarados en el JSON, no todo CSS.
4. Valida visualmente (si hay navegador) 375/768/1440 px, zoom 200 %, Tab, Shift+Tab y lectores de pantalla si están disponibles.
5. Si no puedes abrir navegador, anota **pendiente de verificación manual** en lugar de asumir el resultado.
6. Prioriza P0 (bloqueante), P1 (importante), P2 (mejora).
7. Antes de modificar, ofrece el plan de remediación y solicita confirmación; después verifica el resultado.

## Salida requerida
Tabla con: prioridad, criterio o comportamiento, evidencia (archivo/línea o prueba), problema, recomendación, estado comprobado/pendiente.
Separa observaciones de falsos positivos potenciales y no afirmes que una ausencia de errores automáticos implica accesibilidad garantizada.
