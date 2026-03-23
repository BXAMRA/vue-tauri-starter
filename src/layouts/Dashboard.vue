<!-- src/layouts/DashboardView.vue -->

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

import { SidebarProvider, SidebarInset } from '@ui/sidebar'
import AppTitleBar from '@app/TitleBar.vue'
import Sidebar from '@app/Sidebar.vue'

const ready = ref(false)
const route = useRoute()

const pageTitle = computed(() => {
  const t = route.meta.title
  return typeof t === 'string' ? t : ''
})

onMounted(() => {
  ready.value = true
})
</script>

<template>
  <SidebarProvider storage-key="educare-sidebar" disable-shortcut>
    <div class="flex h-dvh w-screen overflow-hidden">
      <Sidebar />

      <SidebarInset class="flex flex-col overflow-hidden">
        <AppTitleBar class="shrink-0">
          {{ pageTitle }}
        </AppTitleBar>

        <div v-if="ready" class="min-h-0 flex-1 overflow-hidden">
          <router-view />
        </div>
      </SidebarInset>
    </div>
  </SidebarProvider>
</template>
