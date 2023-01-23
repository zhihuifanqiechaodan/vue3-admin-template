<template>
  <div class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component" />
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
const layoutMode = computed(() => settingsStore.layoutMode)

const mainPaddingTop = computed({
  get() {
    let mainPaddingTop = ''
    if (layoutMode.value === 'Classic') {
      if (needTagsView.value) {
        mainPaddingTop = `${50 + 40}px`
      } else {
        mainPaddingTop = '50px'
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
