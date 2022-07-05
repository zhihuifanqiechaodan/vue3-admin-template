<template>
    <div :class="classObj" class="app-wrapper">
        <Sidebar class="sidebar-container" />
        <div :class="{ hasTagsView: needTagsView }" class="main-container">
            <div :class="{ 'fixed-header': fixedHeader }">
                <navbar />
                <!-- <tags-view v-if="needTagsView" /> -->
            </div>
            <app-main />
            <!-- <right-panel v-if="showSettings">
                <settings />
            </right-panel> -->
        </div>
    </div>
</template>
    
<script setup >
import { AppMain, Sidebar, Navbar } from './components'
import { useSettingsStore } from '@/store/settings'
import { computed } from 'vue';

const settingsStore = useSettingsStore()

const classObj = computed(() => {
    return {
        hideSidebar: !settingsStore.sidebarStatus,
        openSidebar: settingsStore.sidebarStatus,
    }
})

const needTagsView = computed(() => settingsStore.tagsView)
const fixedHeader = computed(() => settingsStore.fixedHeader)

</script>
    
<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";

.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
        position: fixed;
        top: 0;
    }
}

.drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
}

.fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
}

.hideSidebar .fixed-header {
    width: calc(100% - 54px)
}

.mobile .fixed-header {
    width: 100%;
}
</style>