<template>
  <el-config-provider :size="size" :z-index="zIndex">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup>
import { ElConfigProvider } from 'element-plus'
import { reactive, toRefs, computed } from 'vue'
import { useSettingsStore } from '@/store/settings'

const settingsStore = useSettingsStore()

const state = reactive({
  zIndex: 3000
})

const { zIndex } = toRefs(state)

const size = computed(() => settingsStore.size)
</script>
