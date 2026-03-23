// src/composables/AppMenu.ts

import { platform } from '@tauri-apps/plugin-os'
import { exit } from '@tauri-apps/plugin-process'
import { Menu, Submenu, MenuItem, PredefinedMenuItem } from '@tauri-apps/api/menu'

import { usePreferencesDialog } from '@composables/AppPreferencesDialog'
import { openAboutWindow } from '@composables/AboutWindow'

let initPromise: Promise<void> | null = null
let menuRef: Menu | null = null

export function useAppMenu() {
  const { openSettings } = usePreferencesDialog()

  async function init() {
    if (platform() !== 'macos') return
    if (initPromise) return initPromise

    initPromise = (async () => {
      const appSubmenu = await Submenu.new({
        text: 'File',
        items: [
          await MenuItem.new({
            id: 'about',
            text: 'About',
            action: openAboutWindow,
          }),

          await PredefinedMenuItem.new({ item: 'Separator' }),

          await MenuItem.new({
            id: 'settings',
            text: 'Settings',
            accelerator: 'Cmd+Comma',
            action: () => void openSettings(),
          }),

          await PredefinedMenuItem.new({ item: 'Separator' }),

          await MenuItem.new({
            id: 'quit',
            text: 'Quit',
            accelerator: 'Cmd+Q',
            action: () => void exit(0),
          }),
        ],
      })

      const editSubmenu = await Submenu.new({
        text: 'Edit',
        items: [
          await PredefinedMenuItem.new({ item: 'Cut' }),
          await PredefinedMenuItem.new({ item: 'Copy' }),
          await PredefinedMenuItem.new({ item: 'Paste' }),
          await PredefinedMenuItem.new({ item: 'SelectAll' }),
        ],
      })

      menuRef = await Menu.new({ items: [appSubmenu, editSubmenu] })
      await menuRef.setAsAppMenu()
    })().catch((err) => {
      initPromise = null
      console.error('Menu init failed:', err)
      throw err
    })

    return initPromise
  }

  function destroy() {
    initPromise = null
    menuRef = null
  }

  return { init, destroy }
}
