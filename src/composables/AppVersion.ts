// src/composables/AppVersion.ts

import { getVersion } from '@tauri-apps/api/app'
import { ref } from 'vue'

const version = ref('')
let loaded = false

export function useAppVersion() {
  if (!loaded) {
    loaded = true
    getVersion().then((v) => (version.value = v))
  }
  return { version }
}
