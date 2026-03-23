// src/composables/AboutWindow.ts

import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
export async function openAboutWindow() {
  const existing = await WebviewWindow.getByLabel('about')
  if (existing) {
    await existing.emit('reapply-preferences')
    await existing.show()
    await existing.setFocus()
    return
  }
}
