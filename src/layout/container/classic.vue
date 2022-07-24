<template>
    <div class="classic-container">
        <Sidebar />
        <div :class="{ hasTagsView: needTagsView }" class="main-container">
            <div :class="{ 'fixed-header': fixedHeader }">
                <navbar />
                <tags-view v-if="needTagsView" />
            </div>
            <app-main />
            <right-panel v-if="showSettings">
                <settings />
            </right-panel>
        </div>
    </div>
</template>
    
<script setup >
import RightPanel from '@/components/RightPanel/index.vue'
import { Navbar, TagsView, Settings, AppMain, Sidebar } from '@/layout/components'
import { useSettingsStore } from '@/store/settings'
import { computed } from 'vue';

const settingsStore = useSettingsStore()

const needTagsView = computed(() => settingsStore.tagsView)
const fixedHeader = computed(() => settingsStore.fixedHeader)
const showSettings = computed(() => settingsStore.showSettings)
const sidebarWidth = computed(() => settingsStore.sidebarWidth)

</script>

<style lang="scss" scoped>
.classic-container {
    display: flex;
    flex-direction: row;

    .main-container {
        flex: 1;
    }
}
</style>