/** Servidor MCP de demostración con JSON-RPC 2.0 sobre stdio, solo lectura.
 * Alcance educativo; para producción utiliza el SDK oficial MCP. */
import readline from "node:readline";
import fs from "node:fs";
import path from "node:path";
import { auditPortfolio, projectRoot } from "./portfolio-audit.mjs";

const tools = [
  {
    name: "auditar_portfolio",
    description:
      "Comprobación local de estructura, proyectos, enlaces y contraste de colores. No certifica WCAG.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: "listar_proyectos",
    description: "Lee proyectos.json e indica qué fichas son ficticias.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
  },
];
const reply = (id, payload, isError = false) =>
  process.stdout.write(
    `${JSON.stringify({ jsonrpc: "2.0", id, [isError ? "error" : "result"]: payload })}\n`,
  );
const resultText = (data) => ({
  content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
});
const lines = readline.createInterface({
  input: process.stdin,
  crlfDelay: Infinity,
});
lines.on("line", (line) => {
  let message;
  try {
    message = JSON.parse(line);
  } catch (e) {
    process.stderr.write(`Mensaje JSON incorrecto: ${e.message}\n`);
    return;
  }
  const { id, method, params = {} } = message;
  if (!Object.prototype.hasOwnProperty.call(message, "id")) return;
  try {
    if (method === "initialize")
      return reply(id, {
        protocolVersion: params.protocolVersion ?? "2025-06-18",
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: "portfolio-demo", version: "1.0.0" },
      });
    if (method === "ping") return reply(id, {});
    if (method === "tools/list") return reply(id, { tools });
    if (method === "tools/call" && params.name === "auditar_portfolio")
      return reply(id, resultText(auditPortfolio()));
    if (method === "tools/call" && params.name === "listar_proyectos") {
      const projects = JSON.parse(
        fs.readFileSync(
          path.join(projectRoot, "src/data/projects.json"),
          "utf8",
        ),
      );
      return reply(
        id,
        resultText(
          projects.map(({ name, category, isExample }) => ({
            name,
            category,
            esEjemplo: isExample === true,
          })),
        ),
      );
    }
    return reply(
      id,
      { code: -32601, message: `Método o tool no disponible: ${method}` },
      true,
    );
  } catch (error) {
    reply(id, {
      content: [{ type: "text", text: error.message }],
      isError: true,
    });
  }
});
