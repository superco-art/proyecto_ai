# Especificación visual de la plantilla

La captura `references/portfolio.png` es una **referencia estética**, no un modelo literal ni una fuente de datos personales. No reproduzcas su nombre, textos, enlaces ni proyectos.

## Diseño actual que debe preservarse
- One-page con navegación superior, hero editorial, proyectos en tarjetas, competencias, contacto y footer.
- Fondo blanco cálido `#f4f2f0`, tinta casi negra `#111111`, superficies en gris cálido.
- Tipografía sans-serif, títulos grandes y contraste de tamaño marcado.
- Dos columnas de tarjetas en escritorio; una en móvil.
- Ilustración geométrica construida con CSS (sin imágenes de terceros).
- Estados interactivos con foco visible y menú móvil desplegable.

## Prioridades de adaptación
1. Jerarquía y legibilidad; las descripciones no deben quedar cortadas.
2. Usabilidad por teclado y lector de pantalla.
3. Espaciado consistente y ausencia de scroll horizontal.
4. Responsive en 375, 768 y 1440 px.
5. Respetar `prefers-reduced-motion` si se añaden animaciones.

## Qué se puede cambiar en el taller
- Nombre, titular, biografía, proyectos y enlaces desde `src/data/`.
- Paleta y tipografía, con contraste suficiente.
- Detalles de las tarjetas o un bloque del hero, de forma incremental.

No afirmes "pixel perfect" ni "WCAG AA aprobado" sin comprobarlo en un navegador.
