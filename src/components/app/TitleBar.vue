<script setup lang="ts">
import { exit } from '@tauri-apps/plugin-process'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { platform } from '@tauri-apps/plugin-os'

import AppPreferences from '@app/PreferencesDialog.vue'

import { openAboutWindow } from '@composables/AboutWindow'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@ui/tooltip'

import { Info, X, Minus, Square } from 'lucide-vue-next'

const props = withDefaults(defineProps<{ closeMode?: boolean }>(), {
  closeMode: false,
})

const win = getCurrentWindow()

const minimize = async () => void win.minimize()
const maximize = () => void win.toggleMaximize()
const exitApp = () => void exit(0)

const closeWindow = () => win.hide()

const showAboutAppButton = platform() != 'macos' || import.meta.env.DEV
</script>

<template>
  <!-- Title Bar -->
  <div>
    <div data-tauri-drag-region class="flex cursor-default items-start justify-between select-none">
      <h1 data-tauri-drag-region class="flex items-center gap-2 p-3 pb-2 text-3xl">
        <slot />
      </h1>

      <!-- Window Controls -->
      <div v-if="!props.closeMode" class="ms-auto flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              as-child
              class="h-8 rounded-b-md px-3 text-zinc-700 underline-offset-3 hover:cursor-pointer hover:bg-zinc-300 hover:text-zinc-950 hover:underline dark:text-white dark:hover:bg-zinc-700 hover:dark:text-white"
            >
              <button v-if="showAboutAppButton" @mousedown.stop @click="openAboutWindow" tabindex="-1" title="About App">
                <Info class="w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>About App</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

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
          class="flex h-8 items-end rounded-b-md px-3 font-mono text-sm text-zinc-700 underline-offset-3 hover:cursor-pointer hover:bg-zinc-300 hover:text-zinc-950 hover:underline dark:text-white dark:hover:bg-zinc-700 hover:dark:text-white"
          title="Minimize"
        >
          <Minus :size="20" />
        </button>

        <button
          @mousedown.stop
          @click="maximize"
          tabindex="-1"
          class="h-8 rounded-b-md px-4 font-mono text-sm text-zinc-700 underline-offset-3 hover:cursor-pointer hover:bg-zinc-300 hover:text-zinc-950 hover:underline dark:text-white dark:hover:bg-zinc-700 hover:dark:text-white"
        >
          <Square :size="16" />
        </button>

        <button
          @mousedown.stop
          @click="exitApp"
          tabindex="-1"
          class="me-3 h-8 rounded-b-md px-3 font-mono text-sm text-red-500 underline-offset-3 hover:cursor-pointer hover:bg-red-600 hover:text-white hover:underline"
          title="Exit"
        >
          <X :size="20" />
        </button>
      </div>

      <div v-if="props.closeMode" class="ms-auto flex items-end gap-1">
        <button
          @mousedown.stop
          @click="closeWindow"
          tabindex="-1"
          class="me-3 h-8 rounded-b-md px-3 font-mono text-sm text-red-500 underline-offset-3 hover:cursor-pointer hover:bg-red-600 hover:text-white hover:underline"
          title="Close"
        >
          <X :size="20" />
        </button>
      </div>
    </div>
  </div>
</template>
