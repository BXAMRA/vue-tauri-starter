<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import AppTitleBar from '@app/TitleBar.vue'

const route = useRoute()

const pageTitle = computed<string>(() => {
  const t = route.meta.title
  return typeof t === 'string' ? t : ''
})

const pageDescription = computed<string>(() => {
  const d = route.meta.description
  return typeof d === 'string' ? d : ''
})
</script>

<template>
  <AppTitleBar closeMode>
    {{ pageTitle }}
    <template v-if="pageDescription" #body>{{ pageDescription }}</template>
  </AppTitleBar>
  <h1>about info here</h1>
</template>
