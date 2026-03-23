// src/composables/AppPreferences.ts

import { ref, watch } from 'vue'
import { baseFontSize, theme as themeStore, palette as paletteStore } from '@services/Store'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { listen } from '@tauri-apps/api/event'

export type Theme = 'system' | 'light' | 'dark'
export type Palette = 'red' | 'monochrome' | 'rose' | 'orange' | 'green' | 'blue' | 'yellow' | 'violet'

const theme = ref<Theme>('system')
const palette = ref<Palette>('red')
const fontSize = ref(16)

const media = window.matchMedia('(prefers-color-scheme: dark)')

const applyModeFromSystem = () => {
  document.documentElement.classList.toggle('dark', media.matches)
}

const applyTheme = (t: Theme) => {
  media.removeEventListener('change', applyModeFromSystem)
  const root = document.documentElement
  if (t === 'dark') {
    root.classList.add('dark')
    root.classList.remove('light')
  } else if (t === 'light') {
    root.classList.remove('dark')
    root.classList.remove('light')
  } else {
    root.classList.remove('light')
    root.classList.remove('dark')
    applyModeFromSystem()
    media.addEventListener('change', applyModeFromSystem)
  }
}

listen('reapply-preferences', () => {
  loadAppPreferences()
})

watch(palette, (p) => {
  document.documentElement.dataset.theme = p
})

watch(theme, (t) => {
  applyTheme(t)
})

watch(fontSize, (s) => {
  if (getCurrentWindow().label === 'main') {
    document.documentElement.style.fontSize = `${s}px`
  }
})

export async function loadAppPreferences() {
  theme.value = (await themeStore.get()) as Theme
  palette.value = (await paletteStore.get()) as Palette
  fontSize.value = await baseFontSize.get()

  document.documentElement.dataset.theme = palette.value

  if (getCurrentWindow().label === 'main') {
    document.documentElement.style.fontSize = `${fontSize.value}px`
  }
  applyTheme(theme.value)
}

// Save to store
export async function saveAppPreferences() {
  await themeStore.set(theme.value)
  await paletteStore.set(palette.value)
  await baseFontSize.set(fontSize.value)
}

export function useAppPreferences() {
  return { theme, palette, fontSize, loadAppPreferences, saveAppPreferences }
}
