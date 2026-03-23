<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'

import { useAppMenu } from '@composables/AppMenu'
import { useAppShortcuts } from '@composables/AppShortcuts'

const { init: initMenu, destroy: destroyMenu } = useAppMenu()
const { registerShortcuts, unregisterShortcuts } = useAppShortcuts()

onMounted(async () => {
  await initMenu()
  await registerShortcuts()
})

onBeforeUnmount(() => {
  destroyMenu()
  void unregisterShortcuts()
})
</script>

<template>
  <div class="flex h-screen flex-col font-sans">
    <div class="flex-1 overflow-hidden">
      <router-view />
    </div>
  </div>
</template>
