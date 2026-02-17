import { ref } from 'vue'
import { baseFontSize } from '@services/Store'

const fontSize = ref(16)

// Load initial values
export async function loadAppPreferences() {
  fontSize.value = await baseFontSize.get()
}

// Save to store
export async function saveAppPreferences() {
  await baseFontSize.set(fontSize.value)
}

export function useAppPreferences() {
  return { fontSize, loadAppPreferences, saveAppPreferences }
}

loadAppPreferences()
