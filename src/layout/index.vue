<template>
    <component :is="layout" class="layout-container" />
</template>
    
<script setup>
import Standard from './container/standard.vue'
import Classic from './container/classic.vue'
import Streamline from './container/streamline.vue'
import { useSettingsStore } from '@/store/settings'
import { computed } from 'vue';

const settingsStore = useSettingsStore()

const layoutEnum = {
    'standard': Standard,
    'classic': Classic,
    'streamline': Streamline
}
const layout = computed(() => layoutEnum[settingsStore.layout])
</script>

<style lang="scss" scoped>
.layout-container {
    height: 100%;
    width: 100%;
}
</style>