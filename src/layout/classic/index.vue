<template>
    <div class="classic-container">
        <sidebar />
        <el-scrollbar class="main-container">
            <div :class="{ 'fixed-header': fixedHeader }">
                <navbar />
                <tags-view v-if="needTagsView" />
            </div>
            <app-main />
        </el-scrollbar>
    </div>
</template>
    
<script setup >
import { Navbar, TagsView, Settings, } from '@/layout/classic/components/index'
import { Sidebar, AppMain } from '@/layout/components/index';
import { useSettingsStore } from '@/store/settings'
import { computed } from 'vue';

const settingsStore = useSettingsStore()
const needTagsView = computed(() => settingsStore.tagsView)
const fixedHeader = computed(() => settingsStore.fixedHeader)
</script>

<style lang="scss" scoped>
.classic-container {
    display: flex;
    flex-direction: row;

    .main-container {
        position: relative;
        flex: 1;
        height: 100vh;

        .fixed-header {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            background-color: #ffffff;
        }
    }
}
</style>