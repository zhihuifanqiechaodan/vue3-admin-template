<template>
    <router-view v-slot="{ Component }">
        <transition name="fade-transform" mode="out-in">
            <keep-alive :include="cachedViews">
                <div :key="key" class="app-main">
                    <component :is="Component" />
                </div>
            </keep-alive>
        </transition>
    </router-view>
</template>
    
<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router'
import { useTagsViewStore } from '@/store/tagsView'
import { useSettingsStore } from '@/store/settings'


const route = useRoute()
const key = computed(() => route.path)

const tagsViewStore = useTagsViewStore()
const cachedViews = computed(() => tagsViewStore.cachedViews)

const settingsStore = useSettingsStore()
const needTagsView = computed(() => settingsStore.tagsView)
const fixedHeader = computed(() => settingsStore.fixedHeader)

const mainPaddingTop = computed({
    get() {
        if (fixedHeader.value) {
            if (needTagsView.value) {
                return `${50 + 40}px`
            } else {
                return `50px`
            }

        } else {
            return `0px`
        }
    }
})
</script>

<style lang="scss" scoped>
.app-main {
    padding-top: v-bind(mainPaddingTop);
}
</style>