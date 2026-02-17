import { ref } from 'vue'
import { backgroundAnimation, baseFontSize } from '@services/Store'

const animationsEnabled = ref(true)
const fontSize = ref(16)

// Load initial values
export async function loadAppPreferences() {
  animationsEnabled.value = await backgroundAnimation.get()
  fontSize.value = await baseFontSize.get()
}

// Save to store
export async function saveAppPreferences() {
  await backgroundAnimation.set(animationsEnabled.value)
  await baseFontSize.set(fontSize.value)
}

export function useAppPreferences() {
  return { animationsEnabled, fontSize, loadAppPreferences, saveAppPreferences }
}

loadAppPreferences()
