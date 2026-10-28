import { auditPortfolio } from "./portfolio-audit.mjs";
const report = auditPortfolio();
console.log("AUDITORÍA DIDÁCTICA DEL PORTFOLIO");
for (const value of report.checks) console.log(`  OK: ${value}`);
for (const value of report.errors) console.error(`  ERROR: ${value}`);
for (const value of report.warnings) console.log(`  AVISO: ${value}`);
console.log(
  `Resultado: ${report.errors.length} errores, ${report.warnings.length} avisos.`,
);
console.log(report.disclaimer);
if (!report.ok) process.exitCode = 1;
