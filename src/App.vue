<script setup lang="ts">
import { onMounted } from 'vue'
import {  baseFontSize } from '@services/Store'

import { useAppMenu } from '@composables/AppMenu'

const { init: initMenu } = useAppMenu()

const initializeFontSize = async () => {
  try {
    const savedFontSize = await baseFontSize.get()
    document.documentElement.style.fontSize = `${savedFontSize}px`
  } catch (e) {
    console.warn('Failed to load font size:', e)
    document.documentElement.style.fontSize = '16px'
  }
}

onMounted(() => {
  void initMenu()

  void initializeFontSize()
})
</script>

<template>
  <router-view />
</template>
