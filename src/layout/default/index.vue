<template>
  <div class="default-container">
    <sidebar class="sidebar" />
    <div class="main-container">
      <div class="fixed-header">
        <tags-view class="tags-view" />
        <navbar />
      </div>
      <el-scrollbar class="main-scrollbar">
        <app-main />
      </el-scrollbar>
    </div>
  </div>
</template>
<script setup>
import { Sidebar, AppMain } from '@/layout/components/index'
import { TagsView, Navbar } from '@/layout/default/components/index'
import { useSettingsStore } from '@/store/settings'
import { computed } from 'vue'

const settingsStore = useSettingsStore()
// 侧边栏宽度 + 20偏差
const menuWidth = computed(() =>
  settingsStore.menuCollapse
    ? 'calc(64px + 20px)'
    : `${settingsStore.menuWidth + 20}px`
)
</script>
<style lang="scss" scoped>
.default-container {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;

  .sidebar {
    z-index: 1001;
    position: fixed;
    top: 20px;
    bottom: 0;
    left: 20px;
    height: calc(100vh - 40px);
    overflow: hidden;
    transition: width 0.28s;
    font-size: 0;
  }

  .main-container {
    position: relative;
    min-height: 100%;
    margin-left: v-bind(menuWidth);
    padding: 20px 0;
    transition: margin-left 0.28s;

    .fixed-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      padding-bottom: 10px;
      box-sizing: border-box;
      background-color: #f5f5f5;

      .tags-view {
        flex: 1;
        margin-right: 10px;
      }
    }

    .main-scrollbar {
      // navbar height 50 padding 上下各20
      height: calc(100vh - 90px);
    }
  }
}
</style>
