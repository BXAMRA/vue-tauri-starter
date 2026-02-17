import { Store } from '@tauri-apps/plugin-store'

// Store Schema Definition
const STORE_SCHEMA = {
  base_font_size: { key: 'base_font_size', default: 16 as number },
} as const

// Store Instance
let store: Store | null = null

async function getStore(): Promise<Store> {
  if (!store) {
    store = await Store.load('.persistence.json')
  }
  return store
}

// Generic Store Handler
function createStoreHandler<T>(
  key: string,
  defaultValue: T,
  onSet?: (value: T) => void,
  onClear?: () => void
) {
  return {
    async get(): Promise<T> {
      try {
        const s = await getStore()
        const value = await s.get<T>(key)
        return value ?? defaultValue
      } catch {
        return defaultValue
      }
    },

    async set(value: T): Promise<void> {
      try {
        const s = await getStore()
        await s.set(key, value)
        await s.save()
        onSet?.(value)
      } catch (e) {
        console.warn(`Failed to save ${key}:`, e)
        throw e
      }
    },

    async clear(): Promise<void> {
      try {
        const s = await getStore()
        await s.delete(key)
        await s.save()
        onClear?.()
      } catch {}
    },
  }
}

// Store Handlers
export const baseFontSize = createStoreHandler(
  STORE_SCHEMA.base_font_size.key,
  STORE_SCHEMA.base_font_size.default,
  // onSet callback: apply font size to DOM
  (size) => {
    document.documentElement.style.fontSize = `${size}px`
  },
  // onClear callback: reset to default
  () => {
    document.documentElement.style.fontSize = '16px'
  }
)

// Clear All
export async function clearAll(): Promise<void> {
  await baseFontSize.clear()
}
