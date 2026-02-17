<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import AppTitleBar from '@app/TitleBar.vue'

const route = useRoute()

const pageTitle = computed(() => {
  const t = route.meta.title
  return typeof t === 'string' ? t : ''
})

const pageDescription = computed(() => {
  const d = route.meta.description
  return typeof d === 'string' ? d : ''
})
</script>

<template>
  <main class="relative flex h-full w-full flex-col">
    <AppTitleBar class="shrink-0">
      <div class="flex items-center gap-2">
        <span>{{ pageTitle }}</span>
      </div>

      <template v-if="pageDescription" #body>{{ pageDescription }}</template>
    </AppTitleBar>
    <div class="flex-1 overflow-auto"><router-view /></div>
  </main>
</template>
