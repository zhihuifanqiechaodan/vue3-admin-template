<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">Page style setting</h3>

      <div class="drawer-item">
        <span>Theme Color</span>
        <!-- <theme-picker style="float: right;height: 26px;margin: -3px 8px 0 0;" @change="themeChange" /> -->
      </div>

      <div class="drawer-item">
        <span>Sidebar Logo</span>
        <el-switch v-model="menuLogo" class="drawer-switch" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSettingsStore } from '@/store/settings'

const settingsStore = useSettingsStore()

const menuLogo = computed({
  get() {
    return settingsStore.menuLogo
  },
  set(val) {
    settingsStore.changeSetting({
      key: 'menuLogo',
      value: val
    })
  }
})

// const themeChange = (val) => {
//   settingsStore.changeSetting({
//     key: 'theme',
//     value: val
//   })
// }
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }
}
</style>
