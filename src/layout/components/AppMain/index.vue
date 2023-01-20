<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <div :key="route.path">
            <component :is="Component" />
          </div>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTagsViewStore } from '@/store/tagsView'
import { useSettingsStore } from '@/store/settings'

const tagsViewStore = useTagsViewStore()
const cachedViews = computed(() => tagsViewStore.cachedViews)

const settingsStore = useSettingsStore()
const needTagsView = computed(() => settingsStore.tagsView)
const fixedHeader = computed(() => settingsStore.fixedHeader)
const layoutMode = computed(() => settingsStore.layoutMode)

const mainPaddingTop = computed({
  get() {
    let mainPaddingTop = ''
    if (layoutMode.value === 'Classic') {
      if (fixedHeader.value) {
        if (needTagsView.value) {
          mainPaddingTop = `${50 + 40}px`
        } else {
          mainPaddingTop = '50px'
        }
      } else {
        mainPaddingTop = '0px'
      }
    }
    return mainPaddingTop
  }
})
</script>

<style lang="scss" scoped>
.app-main {
  padding-top: v-bind(mainPaddingTop);

  /* fade */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.28s;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  /* fade-transform */
  .fade-transform-leave-active,
  .fade-transform-enter-active {
    transition: all 0.5s;
  }

  .fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
  }

  .fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
}
</style>
