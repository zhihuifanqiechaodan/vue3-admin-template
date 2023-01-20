<template>
  <component :is="layoutMode" />
</template>

<script setup>
import Default from '@/layout/default/index.vue'
import Classic from '@/layout/classic/index.vue'
import Streamline from '@/layout/streamline/index.vue'
import { useSettingsStore } from '@/store/settings'
import { computed } from 'vue'

const settingsStore = useSettingsStore()

const layoutEnum = {
  Default: Default,
  Classic: Classic,
  Streamline: Streamline
}
const layoutMode = computed(() => layoutEnum[settingsStore.layoutMode])
</script>
