# Masterclass: Desarrollo web con asistentes de IA

Esta plantilla sirve como base práctica para la sesión de una hora sobre desarrollo web asistido por IA. El objetivo es construir y personalizar un portfolio personal sin escribir todo el código a mano, apoyándonos en modelos de lenguaje y herramientas de inspección automática.

El proyecto parte con los datos personales en `src/data/` (`config.json` y `projects.json`). Los archivos de interfaz (`index.html`, `src/styles.css` y `src/app.js`) los generará el asistente durante el taller.

---

## Preparación previa

Para aprovechar el tiempo de la clase conviene dejar el entorno listo antes de empezar.

### Requisitos obligatorios

1. **Visual Studio Code**: descárgalo e instálalo desde [code.visualstudio.com](https://code.visualstudio.com/).
2. **Cuenta de GitHub**: regístrate en [github.com](https://github.com/signup) si aún no tienes cuenta. La usaremos para Copilot y para publicar la web.
3. **Plantilla del proyecto**:
   - Entra en [github.com/SolvenzaIA/IA-masterclass](https://github.com/SolvenzaIA/IA-masterclass).
   - Haz clic en **Use this template** y luego en **Create a new repository**.
   - Ponle un nombre (por ejemplo `mi-portfolio`), marca el repositorio como **Public** y créalo.
   - Abre la carpeta del proyecto en VS Code clonándola con Git o descargando el archivo ZIP.
4. **GitHub Copilot en VS Code**:
   - Abre la pestaña de extensiones con `Ctrl+Shift+X` (en Mac, `Cmd+Shift+X`).
   - Busca `GitHub Copilot`, pulsa en **Install** e inicia sesión con tu usuario de GitHub.

---

## Herramientas recomendadas y opcionales

Con VS Code y Copilot puedes hacer toda la sesión. Si quieres explorar otros entornos o contar con modelos alternativos, tienes estas dos opciones:

### Opción 1: Google Antigravity IDE (Recomendado)

Google Antigravity es un entorno de desarrollo de Google pensado para trabajar directamente con agentes y el modelo Gemini 3.8 Flash.

1. Entra en [antigravity.google](https://antigravity.google/) y descarga el instalador correspondiente a tu sistema (Mac, Windows o Linux).
2. Instala la aplicación y ábrela.
3. Inicia sesión con tu cuenta de Google.

No necesitas crear ni configurar claves API. El modelo Gemini 3.8 Flash viene integrado en el propio editor.

### Opción 2: Continue con modelos abiertos (Opcional)

Si prefieres quedarte en VS Code pero quieres probar modelos de código abiertos como Qwen o Nemotron, puedes instalar la extensión Continue.

1. En la pestaña de extensiones de VS Code, busca **Continue** e instálala.
2. En la raíz de este proyecto, duplica el archivo `.env.example` y renómbralo como `.env`.
3. Consigue tus claves gratuitas en estos dos proveedores:
   - **Groq**: crea una cuenta en [console.groq.com](https://console.groq.com/) y genera una clave en [console.groq.com/keys](https://console.groq.com/keys). Pégala en `GROQ_API_KEY`.
   - **OpenRouter**: regístrate en [openrouter.ai](https://openrouter.ai/) y genera una clave en [openrouter.ai/settings/keys](https://openrouter.ai/settings/keys). Pégala en `OPENROUTER_API_KEY`. Una sola clave sirve para todos los modelos gratuitos del proveedor.
4. Abre el panel de Continue con `Ctrl+L` (en Mac, `Cmd+L`), pulsa en el icono de configuración (la rueda dentada) y pega este bloque en tu `config.yaml`:

```yaml
name: Main Config
version: 1.0.0
schema: v1
models:
  - name: qwen/qwen3.8-27b
    provider: groq
    model: qwen/qwen3.8-27b
    apiKey: ${{ secrets.GROQ_API_KEY }}
    roles:
      - chat
      - edit
      - apply

  - name: Nemotron 3 Ultra - Free
    provider: openrouter
    model: nvidia/nemotron-3-ultra-550b-a55b:free
    apiBase: https://openrouter.ai/api/v1
    apiKey: ${{ secrets.OPENROUTER_API_KEY }}
    roles:
      - chat
      - edit
      - apply
    capabilities:
      - tool_use

  - name: North Mini Code - Free
    provider: openrouter
    model: cohere/north-mini-code:free
    apiBase: https://openrouter.ai/api/v1
    apiKey: ${{ secrets.OPENROUTER_API_KEY }}
    roles:
      - chat
      - edit
      - apply
    capabilities:
      - tool_use

  - name: Flint - Free
    provider: openrouter
    model: recursive/flint-v1.0:free
    apiBase: https://openrouter.ai/api/v1
    apiKey: ${{ secrets.OPENROUTER_API_KEY }}
    roles:
      - chat
      - edit
      - apply
    capabilities:
      - tool_use

  - name: Nemotron Super VL - Free
    provider: openrouter
    model: nvidia/nemotron-3.5-super-vl:free
    apiBase: https://openrouter.ai/api/v1
    apiKey: ${{ secrets.OPENROUTER_API_KEY }}
    roles:
      - chat
      - edit
      - apply
    capabilities:
      - tool_use
      - image_input

  - name: Nemotron Lightning - Free
    provider: openrouter
    model: nvidia/nemotron-3.5-lightning:free
    apiBase: https://openrouter.ai/api/v1
    apiKey: ${{ secrets.OPENROUTER_API_KEY }}
    roles:
      - chat
      - edit
      - apply
    capabilities:
      - tool_use

context:
  - provider: code
  - provider: docs
  - provider: diff
  - provider: terminal
  - provider: problems
  - provider: folder
  - provider: codebase
```

Continue leerá automáticamente las claves desde tu archivo `.env`. Este archivo está en el `.gitignore`, así que tus credenciales no se subirán nunca a GitHub.

---

## Comprobación rápida

Para asegurarte de que el chat responde antes de la clase:

1. Abre el panel de Copilot o de Continue en VS Code.
2. Escribe una pregunta sencilla, por ejemplo: *«¿Qué archivos componen este proyecto?»*.
3. Si el asistente te contesta leyendo la estructura del proyecto, el entorno está preparado.

---

## Resumen de herramientas

| Herramienta | Rol | Modelos incluidos | Requisitos de acceso |
| :--- | :--- | :--- | :--- |
| **GitHub Copilot** | Obligatorio | Modelos de GitHub y OpenAI | Cuenta de GitHub iniciada en VS Code |
| **Google Antigravity** | Recomendado | Gemini 3.8 Flash | Descargar el IDE e iniciar sesión con Google |
| **Continue + Groq** | Opcional | Qwen 3.8 27B | Clave gratuita de console.groq.com |
| **Continue + OpenRouter** | Opcional | Modelos gratuitos de Cohere y Nvidia | Clave gratuita de openrouter.ai |

---

## Publicación en GitHub Pages

Al terminar el taller podrás publicar tu web con el flujo automático de GitHub Actions:

1. Entra en tu repositorio en GitHub y abre **Settings**.
2. En la sección **Pages** de la barra lateral, cambia la opción **Source** a **GitHub Actions**.
3. Cada vez que hagas `git push` a la rama `main`, GitHub compilará el proyecto y publicará la web en la dirección `https://tu-usuario.github.io/tu-repositorio/`.

---

## Contacto

Si tienes cualquier duda con la instalación o te quedas bloqueado en algún paso, puedes escribir a [info@enriqueteruel.com](mailto:info@enriqueteruel.com).
