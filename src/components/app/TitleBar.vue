<script setup lang="ts">
import { invoke } from '@tauri-apps/api/core'
import { useSlots, computed } from 'vue'

import AppPreferences from '@app/PreferencesDialog.vue'

const slots = useSlots()
const hasBody = computed(() => !!slots.body)

const minimize = () => invoke('minimize_window')
const close = () => invoke('close_window')

const startDrag = async () => await invoke('start_dragging')
</script>

<template>
  <!-- Title Bar -->
  <div>
    <div @mousedown.left="startDrag" class="flex cursor-default items-start justify-between select-none">
      <h1 class="flex items-center gap-2 px-3 pt-3 text-3xl" :class="{ 'pb-2': !hasBody }">
        <slot />
      </h1>

      <!-- Window Controls -->
      <div class="ms-auto flex items-end gap-1">
        <div @mousedown.stop>
          <AppPreferences
            variant="ghost"
            tabindex="-1"
            class="h-8 w-10 rounded-t-none rounded-b-md font-mono text-sm text-zinc-700 underline-offset-3 hover:cursor-pointer hover:bg-zinc-300 hover:text-zinc-950 dark:text-white dark:hover:bg-zinc-700 hover:dark:text-white"
          />
        </div>

        <button
          @mousedown.stop
          @click="minimize"
          tabindex="-1"
          class="h-8 rounded-b-md px-3 font-mono text-sm text-zinc-700 underline-offset-3 hover:cursor-pointer hover:bg-zinc-300 hover:text-zinc-950 hover:underline dark:text-white dark:hover:bg-zinc-700 hover:dark:text-white"
          title="Minimize"
        >
          Min
        </button>

        <button
          @mousedown.stop
          @click="close"
          tabindex="-1"
          class="me-3 h-8 rounded-b-md px-3 font-mono text-sm text-red-500 underline-offset-3 hover:cursor-pointer hover:bg-red-600 hover:text-white hover:underline"
          title="Close"
        >
          Exit
        </button>
      </div>
    </div>
    <p v-if="hasBody" class="px-3 pb-2 text-base text-zinc-500 dark:text-zinc-400">
      <slot name="body" />
    </p>
  </div>
</template>
