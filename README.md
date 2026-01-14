# Vue + Tauri Desktop App Starter

A minimal, production-ready template for building cross-platform desktop applications using Vue 3, Vite, Tailwind CSS, and Tauri.

## ✨ Features

- ⚡️ **Vue 3** - Composition API, `<script setup>` syntax
- 🎨 **Tailwind CSS v4** - Utility-first CSS framework
- 🚀 **Vite** - Lightning-fast build tool
- 🦀 **Tauri v2** - Build smaller, faster, and more secure desktop apps
- 🛣️ **Vue Router** - Official routing library
- 🔒 **Rust Backend** - Secure and performant native backend

## 📋 Prerequisites

- **Node.js** 24+ and npm
  ```bash
  node -v  # v25.2.1 or higher
  npm -v   # 11.6.2 or higher
  ```

- **Rust** 1.70+
  ```bash
  curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
  ```

## 🚀 Quick Start

### 1. Use This Template

Click the **"Use this template"** button on GitHub or clone:

```bash
git clone https://github.com/BXAMRA/vue-tauri-starter.git my-app
cd my-app
npm install
```

### 2. Run Development Server

```bash
npm run tauri:dev
```

This starts Vite dev server and launches the Tauri app window.

### 3. Build for Production

```bash
npm run tauri:build
```

Executables will be in `src-tauri/target/release/bundle/`

## 📁 Project Structure

```
vue-tauri-starter/
├── src/                    # Vue source files
│   ├── assets/            # Static assets
│   ├── components/        # Vue components
│   ├── layouts/           # Layout components
│   ├── views/             # Page views
│   ├── router/            # Vue Router config
│   ├── App.vue            # Root component
│   └── main.js            # Vue entry point
├── src-tauri/             # Tauri/Rust backend
│   ├── src/
│   │   └── main.rs        # Rust entry point
│   ├── icons/             # App icons
│   ├── Cargo.toml         # Rust dependencies
│   └── tauri.conf.json    # Tauri configuration
├── app/                   # Vite build output (gitignored)
├── index.html             # HTML entry point
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
└── package.json           # Node dependencies
```

## 🎨 Customization

### Update App Metadata

Edit `src-tauri/tauri.conf.json`:

```json
{
  "productName": "My Awesome App",
  "version": "1.0.0",
  "identifier": "com.mycompany.myapp",
  "app": {
    "windows": [
      {
        "title": "My Awesome App",
        "width": 1200,
        "height": 800,
        "resizable": true,
        "fullscreen": false
      }
    ]
  }
}
```

### Replace App Icon

1. Create a 1024x1024 PNG icon
2. Generate all required formats:
   ```bash
   npm run tauri icon path/to/your-icon.png
   ```
3. Icons will be generated in `src-tauri/icons/`

### Path Aliases

Configured in `vite.config.js`:

```javascript
import MyComponent from '@/components/MyComponent.vue';
import MyView from '@views/MyView.vue';
import MyLayout from '@layouts/MyLayout.vue';
```

## 📦 Available Scripts

```bash
npm run dev          # Start Vite dev server only
npm run build        # Build Vue app for production
npm run preview      # Preview production build

npm run tauri:dev    # Start Tauri development app
npm run tauri:build  # Build production executable
```

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Vue | 3.5+ | Frontend framework |
| Vite | 7.x | Build tool |
| Tailwind CSS | 4.x | Styling |
| Vue Router | 4.x | Routing |
| Tauri | 2.x | Desktop app framework |
| Rust | 1.70+ | Backend runtime |

## 🔧 Build Targets

Tauri supports multiple platforms:

- **Windows**: `.exe`, `.msi`
- **macOS**: `.app`, `.dmg`
- **Linux**: `.deb`, `.AppImage`

Configure in `tauri.conf.json`:

```json
{
  "bundle": {
    "targets": "all"  // or ["nsis", "msi", "deb", "appimage", "dmg"]
  }
}
```

## 🚀 Production Deployment

### Code Signing (Optional but Recommended)

For distributing to users, consider code signing:

- **Windows**: Requires a code signing certificate
- **macOS**: Requires Apple Developer account and notarization
- **Linux**: No signing required

See [Tauri Distribution Guide](https://v2.tauri.app/distribute/)

## 📝 License

This template is open source and available under the MIT License.

## 🙏 Credits

- App icon: [Example icons created by Freepik - Flaticon](https://www.flaticon.com/free-icons/example)
- Built with [Tauri](https://tauri.app/), [Vue](https://vuejs.org/), and [Vite](https://vitejs.dev/)

## 💡 Tips

- Keep `Cargo.toml` and `main.rs` generic across projects
- Only modify `tauri.conf.json` for app-specific settings
- Use `src-tauri/capabilities` for permissions and security policies
- Check [Tauri documentation](https://v2.tauri.app/) for advanced features

## 🐛 Troubleshooting

**Build fails with Rust errors:**
```bash
cd src-tauri && cargo clean && cd ..
npm run tauri:dev
```

**Icons not showing:**
```bash
npm run tauri icon app-icon.png
```

**Port 5173 already in use:**
Change port in `vite.config.js` and `tauri.conf.json`

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

**Happy Building! 🎉**

Made with ❤️ using Vue + Tauri
