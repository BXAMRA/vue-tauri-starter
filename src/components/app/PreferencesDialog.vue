<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { usePreferencesDialog } from '@composables/UsePreferencesDialog'
import { useAppPreferences } from '@composables/UseAppPreferences'
import { Settings, Plus, Minus } from 'lucide-vue-next'
import { platform } from '@tauri-apps/plugin-os'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@ui/tooltip'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@ui/alert-dialog'

import { Kbd, KbdGroup } from '@ui/kbd'

import { Button } from '@ui/button'
import { Label } from '@ui/label'

const { preferencesOpen, closeSettings, openSettings } = usePreferencesDialog()

const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon' | 'xs'
    class?: string
  }>(),
  {
    variant: 'secondary',
    size: 'sm',
    class: '',
  }
)

const { fontSize: globalFontSize, saveAppPreferences } = useAppPreferences()

// Local state for preview
const fontSize = ref(16)
const isSaving = ref(false)

const hasChanges = computed(() => {
  return fontSize.value !== globalFontSize.value
})

// Font size presets
const MIN_FONT_SIZE = 14
const MAX_FONT_SIZE = 22
const DEFAULT_FONT_SIZE = 16

// Load from composable when dialog opens
watch(preferencesOpen, (isOpen) => {
  if (isOpen) {
    fontSize.value = globalFontSize.value
  }
})

const increaseFontSize = () => {
  if (fontSize.value < MAX_FONT_SIZE) {
    fontSize.value += 1
  }
}

const decreaseFontSize = () => {
  if (fontSize.value > MIN_FONT_SIZE) {
    fontSize.value -= 1
  }
}

const loadDefaults = () => {
  fontSize.value = DEFAULT_FONT_SIZE
}

const isAtDefaults = computed(() => {
  return fontSize.value === DEFAULT_FONT_SIZE
})

const savePreferences = async () => {
  if (isSaving.value) return

  isSaving.value = true
  try {
    // Update composable values (triggers reactive updates everywhere)
    globalFontSize.value = fontSize.value

    // Save to store
    await saveAppPreferences()

    preferencesOpen.value = false
  } catch (e) {
    console.error('Failed to save preferences:', e)
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <AlertDialog v-model:open="preferencesOpen">
    <AlertDialogTrigger as-child>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button :variant="variant" :size="size" tabindex="-1" :class="class" class="group" @click="openSettings">
              <Settings class="group-hover:animate-spin" style="animation-duration: 3s" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span class="flex items-center gap-1">
              App Preferences
              <KbdGroup class="flex items-center">
                <Kbd v-if="platform() === 'macos'" class="rounded-lg border">⌘</Kbd>
                <Kbd v-else class="rounded-lg border">Ctrl</Kbd>
                <span>+</span>
                <Kbd class="rounded-lg border">,</Kbd>
              </KbdGroup>
            </span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle class="flex items-center gap-2">
          <Settings class="size-5" />
          App Preferences
          <Button
            type="Button"
            size="sm"
            variant="outline"
            class="ms-auto flex items-center gap-1 px-1"
            @click="closeSettings"
          >
            <span class="pt-1"> Close </span>
            <KbdGroup class="flex items-center">
              <Kbd class="border">Esc</Kbd>
            </KbdGroup>
          </Button>
        </AlertDialogTitle>
        <AlertDialogDescription> Configure application settings and preferences. </AlertDialogDescription>
      </AlertDialogHeader>

      <form id="dialogForm" class="space-y-4" @submit.prevent="savePreferences">
        <!-- Font Size Control -->
        <div class="flex items-center justify-between">
          <Label class="text-sm font-medium">Text Size</Label>

          <div class="flex items-center justify-center rounded-lg border">
            <Button
              type="button"
              variant="secondary"
              size="xs"
              class="rounded-none border-r"
              :disabled="fontSize <= MIN_FONT_SIZE"
              @click="decreaseFontSize"
            >
              <Minus :size="16" />
            </Button>

            <div class="w-16 text-center">{{ fontSize }}</div>

            <Button
              type="button"
              variant="secondary"
              size="xs"
              class="rounded-none border-l"
              :disabled="fontSize >= MAX_FONT_SIZE"
              @click="increaseFontSize"
            >
              <Plus :size="16" />
            </Button>
          </div>
        </div>

        <!-- Preview Text -->
        <div class="rounded-lg border p-4 text-center">
          <p :style="{ fontSize: `${fontSize}px` }" class="font-medium">Preview Text</p>
          <p :style="{ fontSize: `${fontSize * 0.875}px` }" class="mt-1 text-muted-foreground">
            This is how your text will look
          </p>
        </div>
      </form>

      <AlertDialogFooter>
        <Button type="button" variant="outline" size="sm" @click="loadDefaults" :disabled="isAtDefaults">
          Load Defaults
        </Button>

        <AlertDialogAction size="sm" :disabled="!hasChanges || isSaving" @click="savePreferences">
          {{ isSaving ? 'Saving...' : 'Save and close' }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
