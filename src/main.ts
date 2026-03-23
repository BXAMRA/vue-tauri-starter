import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'
import '@/style.css'

import { loadAppPreferences } from '@composables/AppPreferences'

const pinia = createPinia()

function shouldAllowCustomContextMenu(target: EventTarget | null) {
  const el = target instanceof Element ? target : null
  return !!el?.closest('[data-slot="context-menu-trigger"]')
}

function isEditableTarget(target: EventTarget | null) {
  const el = target instanceof Element ? target : null
  return !!el?.closest('input, textarea, [contenteditable="true"], [contenteditable=""], [role="textbox"]')
}

if (import.meta.env.PROD) {
  document.addEventListener(
    'contextmenu',
    (e) => {
      if (isEditableTarget(e.target)) return
      if (shouldAllowCustomContextMenu(e.target)) return
      e.preventDefault()
    },
    { capture: true }
  )
}

;(async () => {
  await loadAppPreferences()

  createApp(App).use(pinia).use(router).mount('#app')
})()
