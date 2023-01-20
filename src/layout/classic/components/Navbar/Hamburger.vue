<template>
  <div @click="toggleClick" class="hamburger-container">
    <svg-icon
      name="hamburger"
      class="hamburger"
      :class="{ menuCollapse: menuCollapse }"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSettingsStore } from '@/store/settings'

const settingsStore = useSettingsStore()
const menuCollapse = computed(() => settingsStore.menuCollapse)

const toggleClick = () => {
  settingsStore.changeSetting({
    key: 'menuCollapse',
    value: !settingsStore.menuCollapse
  })
}
</script>

<style lang="scss" scoped>
.hamburger-container {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 15px;
  transition: background 0.3s;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }

  .hamburger {
    font-size: 20px;
    transform: rotate(180deg);
  }

  .hamburger.menuCollapse {
    transform: rotate(0);
  }
}
</style>
