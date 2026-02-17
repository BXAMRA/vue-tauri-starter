import { platform } from '@tauri-apps/plugin-os'
import { exit } from '@tauri-apps/plugin-process'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { Menu, Submenu, MenuItem, PredefinedMenuItem } from '@tauri-apps/api/menu'

import { usePreferencesDialog } from '@composables/UsePreferencesDialog'

let initialized = false

const { openSettings } = usePreferencesDialog()

export function useAppMenu() {
  async function init() {
    if (initialized) return
    initialized = true

    // macOS note: all items must be grouped under a submenu (top-level items are ignored)
    // and the first submenu is placed under the app's "About" menu slot by default.
    const appSubmenu = await Submenu.new({
      text: 'File',
      items: [
        await MenuItem.new({
          id: 'about',
          text: 'About',
          action: () => {},
        }),
        await MenuItem.new({
          id: 'settings',
          text: 'Settings',
          accelerator: 'CmdOrCtrl+,',
          action: () => openSettings(),
        }),
        await MenuItem.new({
          id: 'quit',
          text: 'Quit',
          accelerator: 'CmdOrCtrl+Q',
          action: async () => await exit(0),
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

    const menu = await Menu.new({ items: [appSubmenu, editSubmenu] })

    if (platform() === 'macos') {
      await menu.setAsAppMenu()
    } else {
      await menu.setAsWindowMenu(getCurrentWindow())
    }
  }

  return { init }
}
