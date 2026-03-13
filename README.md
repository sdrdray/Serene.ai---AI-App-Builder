Serene AI

Serene is a local, open-source AI-powered app builder that runs entirely on your own machine. It lets you describe what you want to build in plain language and generates a fully working web application for you, without needing to write code yourself. Think of it like Lovable, v0, or Bolt — but completely private, offline-capable, and under your full control.

This project started as a fork of Dyad and was renamed and customized into Serene. All core functionality has been preserved and extended.


What Serene Does

Serene connects to AI language models (like Claude, GPT-4, Gemini, or local models via Ollama and LM Studio) and uses them to build React and Next.js web apps from your text descriptions. You can chat with the AI to create new apps, make changes to existing ones, fix errors, switch between versions, and manage your projects — all through a desktop interface built with Electron.

Apps are generated and stored locally on your computer under a folder called serene-apps in your home directory. Each app is a real, runnable project with its own package.json, Vite config, and source files. You can open them, edit them, or deploy them just like any other web project.


Key Features

Local and private: Everything runs on your machine. Your code and conversations never leave your computer unless you explicitly push them somewhere. No subscription required, no data collection, no vendor lock-in.

Bring your own API keys: You connect Serene to AI providers using your own API keys. Supported providers include Anthropic (Claude), OpenAI (GPT-4 and others), Google (Gemini), and any OpenAI-compatible endpoint. For fully local inference, Serene works with Ollama and LM Studio out of the box.

Visual app preview: Generated apps run inside a live preview panel within the Serene desktop window. Changes appear in real time as the AI writes and modifies code.

Chat-based editing: You describe changes in plain English and the AI rewrites the relevant parts of the app. Serene parses structured XML tags from the AI's responses to apply file writes, renames, deletions, and dependency changes automatically.

Version history: Every significant change creates a version checkpoint. You can browse previous versions and switch back to any of them at any time.

Undo and redo: Fine-grained undo support lets you reverse individual changes without losing everything.

Error detection and auto-fix: Serene monitors your app for TypeScript and runtime errors and can ask the AI to fix them automatically.

Component selection: You can click on any element in the live preview to select it, and Serene will highlight the corresponding code and let you edit it through the AI.

Supabase integration: Built-in support for Supabase allows the AI to create and manage database tables, run migrations, and generate client code for your app.

Template system: Start from a blank React or Next.js template, or use community templates. Templates provide a preconfigured starting point so the AI has less to generate from scratch.

Import existing projects: You can import an existing local project into Serene and use the AI to modify it.

Cross-platform: Runs on Windows and macOS. Built with Electron, Vite, and React.


How It Works

Serene is a desktop application built with Electron. The user interface is a React app rendered in the Electron renderer process. A background worker process handles running and managing the generated app previews. Communication between the UI and the main Electron process happens through IPC channels.

When you type a message in the chat, Serene sends it to your chosen AI provider along with the current state of your app's source files. The AI responds with a mix of plain text explanation and structured XML-tagged instructions like serene-write (to create or update a file), serene-delete (to remove a file), serene-rename (to rename a file), and serene-add-dependency (to install a new npm package). Serene parses these tags and applies each operation to the app's files on disk.

After applying changes, Serene triggers a hot reload in the preview so you see the result immediately. If anything breaks, the error is shown in the chat and you can ask the AI to fix it.

Conversation history is stored in a local SQLite database using Drizzle ORM. App metadata, provider configurations, and settings are also persisted locally.


Project Structure

The main application source lives in the src directory. IPC handlers for all app operations are in src/ipc/handlers. The AI tag parsing logic is in src/ipc/utils/serene_tag_parser.ts. Path utilities are in src/paths/paths.ts. The chat components are in src/components/chat. Supabase integration is in src/supabase_admin.

The scaffold directory contains the base template that new apps are generated from. It is a standard Vite + React project with Tailwind CSS and the Serene component tagger plugin pre-configured.

The worker directory contains the proxy server and shim scripts that run inside each generated app's preview environment.

The packages directory contains local copies of the component tagger packages used by the scaffold and Next.js templates.

End-to-end tests are in the e2e-tests directory and use Playwright. Unit tests use Vitest.


Getting Started

To run Serene from source, you need Node.js (version 20 or later) and npm installed.

Clone the repository, navigate into the project folder, and run npm install to install dependencies. Then run npm start to launch the Electron app in development mode.

When Serene opens, go to Settings and add your API key for at least one AI provider. Then create a new app, give it a name, and start chatting to build it.

Generated apps are saved to a folder called serene-apps inside your home directory. Each app is a self-contained project that you can open in any code editor or deploy to any hosting platform.


License

Serene is open source and released under the Apache 2.0 license. You are free to use, modify, and distribute it. Contributions are welcome — see the CONTRIBUTING.md file for guidelines.
