import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { auditPortfolio, projectRoot } from "./portfolio-audit.mjs";

function withFixture(run) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-test-"));
  try {
    fs.mkdirSync(path.join(tmp, "src/data"), { recursive: true });
    for (const file of [
      "src/data/config.json",
      "src/data/projects.json",
      "index.html",
      "src/styles.css",
    ]) {
      fs.copyFileSync(path.join(projectRoot, file), path.join(tmp, file));
    }
    return run(tmp);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

test("los datos de la plantilla son estructuralmente válidos", () => {
  withFixture((root) => assert.equal(auditPortfolio(root).ok, true));
});

test("se detectan enlaces inválidos en config.json", () => {
  withFixture((root) => {
    const p = path.join(root, "src/data/config.json");
    const config = JSON.parse(fs.readFileSync(p, "utf8"));
    config.contact.github = "enlace-sin-https";
    fs.writeFileSync(p, JSON.stringify(config));
    const result = auditPortfolio(root);
    assert.equal(result.ok, false);
    assert.ok(
      result.errors.some(
        (error) => error.includes("GitHub") || error.includes("github"),
      ),
    );
  });
});

test("se avisa cuando el contraste del texto es insuficiente", () => {
  withFixture((root) => {
    const p = path.join(root, "src/data/config.json");
    const config = JSON.parse(fs.readFileSync(p, "utf8"));
    config.colors.text = "#eeeeee";
    fs.writeFileSync(p, JSON.stringify(config));
    const report = auditPortfolio(root);
    assert.ok(
      report.warnings.some((warning) =>
        warning.includes("Contraste text/background"),
      ),
    );
  });
});
