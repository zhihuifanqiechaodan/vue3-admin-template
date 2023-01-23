<template>
  <div class="classic-container">
    <sidebar class="sidebar" />
    <el-scrollbar class="main-container">
      <div class="fixed-header">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
    </el-scrollbar>
  </div>
</template>

<script setup>
import { Navbar, TagsView } from '@/layout/classic/components/index'
import { Sidebar, AppMain } from '@/layout/components/index'
import { useSettingsStore } from '@/store/settings'
import { computed } from 'vue'

const settingsStore = useSettingsStore()

const needTagsView = computed(() => settingsStore.tagsView)
// 侧边栏宽度
const menuWidth = computed(() =>
  settingsStore.menuCollapse ? '64px' : `${settingsStore.menuWidth}px`
)
</script>

<style lang="scss" scoped>
.classic-container {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;

  .sidebar {
    z-index: 1001;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    height: 100vh;
    overflow: hidden;
    transition: width 0.28s;
    background-color: #304156;
    font-size: 0;
  }

  .main-container {
    position: relative;
    min-height: 100%;
    margin-left: v-bind(menuWidth);
    transition: margin-left 0.28s;

    .fixed-header {
      z-index: 1;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background-color: #ffffff;
    }
  }
}
</style>
