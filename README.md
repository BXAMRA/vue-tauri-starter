# Vite + Vue + Tauri Desktop App Starter

A minimal, production-ready template for building cross-platform desktop applications using Vue 3, Vite, Tailwind CSS, and Tauri.

## ✨ Features

- ⚡️ **Vue 3** - Composition API, `<script setup>` syntax
- 🎨 **Tailwind CSS v4** - Utility-first CSS framework
- 🚀 **Vite** - Lightning-fast build tool
- 🦀 **Tauri v2** - Build smaller, faster, and more secure desktop apps
- 🛣️ **Vue Router** - Official routing library
- 🧩 **shadcn-vue** _(pre-configured)_ - Ready to use with aliases + components/ui structure
- 📦 **3–5MB Executables** - Tiny app bundles compared to Electron
- 🔒 **Rust Backend** - Secure and performant native backend
- 🪟 **Frameless windows + custom title bar** - Custom drag region + window controls

## 📋 Prerequisites

- **Node.js** 24+ and **pnpm**

```bash
node -v
pnpm -v
```

- **Rust** (stable)

```bash
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```

## 🚀 Quick Start

### 1. Use This Template

Click the **"Use this template"** button on GitHub or clone:

```bash
git clone https://github.com/BXAMRA/vue-tauri-starter.git my-app
cd my-app
pnpm install
```

### 2. Run Development App

```bash
pnpm tauri dev
```

This starts the Vite dev server and launches the Tauri desktop window.

### 3. Build for Production

```bash
pnpm tauri build
```

Executables will be in `src-tauri/target/release/bundle/`.

## 📁 Project Structure

```text
vue-tauri-starter/
├── src/                          # Vue source files
│   ├── assets/                   # Static assets
│   ├── components/
│   │   ├── app/                  # Custom app components (TitleBar, PreferencesDialog, etc.)
│   │   └── ui/                   # shadcn-vue components
│   ├── composables/              # Vue composables
│   ├── layouts/                  # Layout components
│   ├── pages/                    # Route pages
│   ├── services/                 # App services (e.g., persisted settings)
│   ├── App.vue                   # Root component
│   ├── main.ts                   # Vue entry point
│   └── router.ts                 # Vue Router config
├── src-tauri/                    # Tauri/Rust backend
│   ├── src/
│   │   └── main.rs               # Rust entry point
│   ├── icons/                    # App icons
│   ├── Cargo.toml                # Rust dependencies
│   └── tauri.conf.json           # Tauri configuration
├── app/                          # Vite build output (gitignored)
├── app-icon.png                  # Main 1024x1024 icon source
├── index.html                    # HTML entry point
├── vite.config.ts                # Vite configuration
└── package.json                  # Node dependencies
```

## 🎨 Customization

### Update App Metadata

Edit `src-tauri/tauri.conf.json`:

```json
{
  "productName": "My Awesome App",
  "version": "1.0.0",
  "identifier": "com.mycompany.myapp"
}
```

### Replace App Icon

1. Place your 1024×1024 PNG icon in the project root and rename to `app-icon.png`
2. Generate all required formats (for desktop only):

```bash
pnpm create-desktop-icons
```

3. Icons will be generated in `src-tauri/icons/`

### Path Aliases

Configured in `vite.config.ts`:

```ts
import MyComponent from '@/components/MyComponent.vue'
import Home from '@pages/Home.vue'
import DefaultView from '@layouts/DefaultView.vue'
import TitleBar from '@app/TitleBar.vue'
import { Button } from '@ui/button'
import { baseFontSize } from '@services/Store'
import { useAppMenu } from '@composables/AppMenu'
```

### App Preferences

- Open from the title bar (gear icon); tooltip shows Cmd/Ctrl + ,.
- Text size can be adjusted (14–22), previewed live, and saved.
- Saved preferences persist and are applied on app startup.

## 🪟 Frameless windows + custom title bar

This starter configures the windows as frameless (`decorations: false`) and uses a custom Vue title bar for drag + window controls.

To switch back to native window chrome/title bars, see Tauri’s Window Customization docs.

## 📦 Available Scripts

```bash
pnpm dev                   # Start Tauri development app
pnpm build                 # Type-check + build production executable

pnpm vite:dev              # Start Vite dev server only
pnpm vite:build            # Type-check + build Vue app for production

pnpm type-check            # TypeScript type-check only (no emit)

pnpm cargo:clean           # cargo clean (src-tauri/Cargo.toml)
pnpm cargo:update          # cargo update (src-tauri/Cargo.toml)

pnpm create-desktop-icons  # Generate desktop icons from app-icon.png, and cleans up
pnpm vite:clean            # Clean Vite cache + build output (node_modules/.vite + app)
```

## 🛠️ Tech Stack

| Technology   | Version | Purpose               |
| ------------ | ------- | --------------------- |
| Vue          | 3.5+    | Frontend framework    |
| Vite         | 7.x     | Build tool            |
| Tailwind CSS | 4.x     | Styling               |
| Vue Router   | 4.x     | Routing               |
| Tauri        | 2.x     | Desktop app framework |
| Rust         | 1.91+   | Backend runtime       |

## 🔧 Build Targets

Tauri supports multiple platforms:

- **Windows**: `.exe`, `.msi`
- **macOS**: `.app`, `.dmg`
- **Linux**: `.deb`, `.AppImage`

Configure in `tauri.conf.json`:

```json
{
  "bundle": {
    "targets": "all"
  }
}
```

## 🚀 Production Deployment

### Code Signing (Optional but Recommended)

For distributing to users, consider code signing:

- **Windows**: Requires a code signing certificate
- **macOS**: Requires Apple Developer account and notarization
- **Linux**: No signing required

See Tauri Distribution Guide: https://v2.tauri.app/distribute/

## 📝 License

This template is open source and available under the MIT License.

## 🙏 Credits

- App icon: Example icons created by Freepik - Flaticon (https://www.flaticon.com/free-icons/example)
- Built with Tauri (https://tauri.app/), Vue (https://vuejs.org/), and Vite (https://vitejs.dev/)

## 💡 Tips

- Keep `Cargo.toml` and `main.rs` generic across projects
- Only modify `tauri.conf.json` for app-specific settings
- Place your main icon (1024×1024 PNG) in project root before generating
- Mobile icon folders can be safely deleted for desktop-only apps
- Use `src-tauri/capabilities` for permissions and security policies
- Check https://v2.tauri.app/ for advanced features

## 🐛 Troubleshooting

**Build fails with Rust errors:**

```bash
cd src-tauri && cargo clean && cd ..
pnpm tauri dev
```

**Icons not showing:**

```bash
pnpm tauri icon app-icon.png
```

**Port 5173 already in use:**
Change port in `vite.config.ts` and `tauri.conf.json`

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
