import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'
import '@/style.css'

// const pinia = createPinia()

const media = window.matchMedia('(prefers-color-scheme: dark)')

const applyTheme = () => {
  document.documentElement.classList.toggle('dark', media.matches)
}

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

applyTheme()
media.addEventListener('change', applyTheme)

const app = createApp(App)
app.use(router)
// app.use(pinia)
app.mount('#app')
