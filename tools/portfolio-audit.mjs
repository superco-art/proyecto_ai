import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const read = (root, relativePath) =>
  fs.readFileSync(path.join(root, relativePath), "utf8");
const parseHex = (value) =>
  typeof value === "string" && /^#[\da-f]{6}$/i.test(value)
    ? [1, 3, 5].map(
        (start) => parseInt(value.slice(start, start + 2), 16) / 255,
      )
    : null;
const luminance = (value) => {
  const rgb = parseHex(value);
  return rgb === null
    ? null
    : rgb
        .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
        .reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i], 0);
};
const contrast = (a, b) => {
  const aa = luminance(a);
  const bb = luminance(b);
  return aa === null || bb === null
    ? null
    : (Math.max(aa, bb) + 0.05) / (Math.min(aa, bb) + 0.05);
};

/** Verificación educativa estática. No equivale a una auditoría WCAG. */
export function auditPortfolio(root = projectRoot) {
  const errors = [],
    warnings = [],
    checks = [];
  const load = (p, json = false) => {
    try {
      const content = read(root, p);
      return json ? JSON.parse(content) : content;
    } catch (e) {
      errors.push(`No se pudo leer ${p}: ${e.message}`);
      return null;
    }
  };
  const config = load("src/data/config.json", true);
  const projects = load("src/data/projects.json", true);
  const html = load("index.html"),
    css = load("src/styles.css");
  if (config) {
    for (const field of ["name", "profession", "headline"]) {
      if (typeof config[field] !== "string" || !config[field].trim())
        errors.push(`config.json: falta ${field}`);
    }
    if (!Array.isArray(config.skills) || config.skills.length === 0)
      errors.push("config.json: skills debe ser un array no vacío");
    if (
      !Array.isArray(config.about) ||
      !config.about.every((p) => typeof p === "string")
    )
      errors.push("config.json: about debe ser un array de textos");
    if (config.name?.toLowerCase().includes("tu nombre"))
      warnings.push("Sustituye «Tu Nombre» por tu nombre antes de publicar.");
    const contact = config.contact ?? {};
    for (const [field, value] of Object.entries(contact)) {
      if (!value) continue;
      if (field === "email") {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          errors.push("config.json: email inválido");
      } else {
        try {
          const url = new URL(value);
          if (!["http:", "https:"].includes(url.protocol))
            errors.push(`Enlace ${field} debe usar http(s)`);
        } catch {
          errors.push(`Enlace ${field} no es una URL válida`);
        }
      }
    }
    for (const [name, hex] of Object.entries(config.colors ?? {}))
      if (!parseHex(hex)) errors.push(`Color ${name}: usa #RRGGBB`);
    for (const name of ["text", "muted"]) {
      const ratio = contrast(config.colors?.[name], config.colors?.background);
      if (ratio !== null) {
        checks.push(
          `Contraste orientativo ${name}/background: ${ratio.toFixed(2)}:1`,
        );
        if (ratio < 4.5)
          warnings.push(
            `Contraste ${name}/background: ${ratio.toFixed(2)}:1, por debajo de 4.5:1 (texto normal); revisar uso real.`,
          );
      }
    }
    checks.push("Estructura y enlaces de config.json: revisados");
  }
  if (projects) {
    if (!Array.isArray(projects))
      errors.push("projects.json: debe ser un array");
    else {
      const seen = new Set();
      for (const [index, p] of projects.entries()) {
        if (!p || typeof p !== "object") {
          errors.push(`Proyecto ${index + 1}: estructura inválida`);
          continue;
        }
        for (const field of ["name", "category", "description"])
          if (typeof p[field] !== "string" || !p[field].trim())
            errors.push(`Proyecto ${index + 1}: falta ${field}`);
        if (!Array.isArray(p.technologies))
          errors.push(`Proyecto ${index + 1}: technologies debe ser un array`);
        if (seen.has(p.name))
          warnings.push(`Nombre de proyecto duplicado: ${p.name}`);
        seen.add(p.name);
        if (p.isExample === true)
          warnings.push(`Proyecto ficticio visible: ${p.name}`);
        if (p.url) {
          try {
            if (!["http:", "https:"].includes(new URL(p.url).protocol))
              throw new Error();
          } catch {
            errors.push(`Proyecto ${index + 1}: URL no válida`);
          }
        }
      }
      checks.push(`Proyectos declarados: ${projects.length}`);
    }
  }
  if (html) {
    if (!/<html\b[^>]*\blang="es"/.test(html))
      warnings.push('index.html: no se detectó lang="es".');
    if ((html.match(/<h1\b/gi) ?? []).length !== 1)
      warnings.push("index.html: se esperaba exactamente un h1.");
    if (!/<main\b/.test(html) || !/<nav\b/.test(html))
      warnings.push("index.html: revisa landmarks nav/main.");
    if (!/<meta\b[^>]*name="description"/.test(html))
      warnings.push("index.html: falta meta description.");
    if (!/aria-expanded="false"/.test(html))
      warnings.push("index.html: revisar aria-expanded del menú.");
    checks.push("Comprobaciones básicas del HTML: realizadas");
  }
  if (css) {
    if (!css.includes(":focus-visible"))
      warnings.push("styles.css: no se detecta :focus-visible.");
    if (!css.includes("@media"))
      warnings.push("styles.css: no se detectan media queries.");
    checks.push("Comprobaciones básicas del CSS: realizadas");
  }
  return {
    ok: errors.length === 0,
    checks,
    errors,
    warnings,
    disclaimer:
      "Revisión estática parcial: faltan pruebas reales de teclado, lector de pantalla, navegador, responsive y WCAG.",
  };
}
