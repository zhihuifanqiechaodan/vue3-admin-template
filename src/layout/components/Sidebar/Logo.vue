<template>
  <div class="sidebar-logo-container" :class="{ menuCollapse: menuCollapse }">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="menuCollapse"
        key="menuCollapse"
        class="sidebar-logo-link"
        to="/"
      >
        <img v-if="logo" :src="logo" class="sidebar-logo" />
        <h1 v-else class="sidebar-title">{{ title }}</h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo" />
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script setup>
import { reactive, toRefs, computed } from 'vue'
import { useSettingsStore } from '@/store/settings'

const state = reactive({
  title: 'Vue3 Element Plus Admin',
  logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
})

const { title, logo } = toRefs(state)

const settingsStore = useSettingsStore()
const menuBackgroundColor = computed(() => settingsStore.menuBackgroundColor)

defineProps({
  // 侧边栏展开状态
  menuCollapse: {
    type: Boolean,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter-from,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: v-bind(menuBackgroundColor);
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 12px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.menuCollapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
