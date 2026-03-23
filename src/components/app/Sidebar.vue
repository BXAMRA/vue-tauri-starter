<script setup lang="ts">
import { type Component } from 'vue'
import { RouterLink } from 'vue-router'

import { useAppVersion } from '@composables/AppVersion'

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@ui/sidebar'

import { LayoutDashboard } from 'lucide-vue-next'

type SidebarItem = {
  to: string
  label: string
  icon: Component
}

type SidebarGroupDef = {
  label?: string
  items: SidebarItem[]
}

const sidebarGroups: SidebarGroupDef[] = [
  { items: [{ to: '/home', label: 'HOME', icon: LayoutDashboard }] },
  {
    label: 'Section with title',
    items: [{ to: '/home', label: 'Home', icon: LayoutDashboard }],
  },
]
</script>

<template>
  <Sidebar side="left" variant="sidebar">
    <!-- Header -->
    <SidebarHeader data-tauri-drag-region class="p-0">
      <SidebarMenu data-tauri-drag-region>
        <SidebarMenuItem data-tauri-drag-region class="space-y-2 border-b bg-accent py-2">
          <div data-tauri-drag-region class="flex flex-col px-4">
            <span data-tauri-drag-region class="text-lg uppercase"> BXAMRA </span>
            <span data-tauri-drag-region class="text-sm text-muted-foreground">
              Tauri Vue Starter <span data-tauri-drag-region class="font-code text-2xs">v{{ useAppVersion().version }}</span>
            </span>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <!-- Content -->
    <SidebarContent class="scrollbar-hide">
      <SidebarGroup v-for="(group, gi) in sidebarGroups" :key="gi">
        <SidebarGroupLabel v-if="group.label">{{ group.label }}</SidebarGroupLabel>

        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in group.items" :key="item.to">
              <RouterLink :to="item.to" v-slot="{ isActive }">
                <SidebarMenuButton :is-active="isActive">
                  <div :class="['flex w-full items-center gap-2 transition-all', isActive && 'ps-2']">
                    <component :is="item.icon" stroke-width="2.5" class="size-4" />
                    <span>{{ item.label }}</span>
                  </div>
                </SidebarMenuButton>
              </RouterLink>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <!-- Footer -->
    <SidebarFooter class="p-0">
      <SidebarMenu>
        <SidebarMenuItem class="m-1.5 space-y-2 rounded-lg border bg-accent p-2">
          <div class="flex items-center justify-center">
            <div class="flex flex-1 flex-col text-left leading-tight">
              <span class="truncate"> BXAMRA </span>
              <span class="truncate text-xs text-muted-foreground"> https://github.com/BXAMRA </span>
            </div>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>
