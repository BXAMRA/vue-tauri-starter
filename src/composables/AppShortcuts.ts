// src/composables/AppShortcuts.ts

import { register, unregisterAll } from '@tauri-apps/plugin-global-shortcut'
import { exit } from '@tauri-apps/plugin-process'
import { usePreferencesDialog } from '@composables/AppPreferencesDialog'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { platform } from '@tauri-apps/plugin-os'

export function useAppShortcuts() {
  const { openSettings } = usePreferencesDialog()
  const os = platform()

  async function registerShortcuts() {
    if (os === 'macos') return

    await register('Ctrl+Q', async () => {
      if (await getCurrentWindow().isFocused()) void exit(0)
    })

    await register('Ctrl+Comma', () => void openSettings())
  }

  const unregisterShortcuts = () => unregisterAll()

  return { registerShortcuts, unregisterShortcuts }
}
