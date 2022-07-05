<template>
    <div :class="{ 'has-logo': showLogo }">
        <Logo v-if="showLogo" :collapse="!isCollapse" />
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu :default-active="activeMenu" :collapse="isCollapse" :unique-opened="false"
                :collapse-transition="false" mode="vertical" :background-color="variablesJson.menuBg"
                :text-color="variablesJson.menuText" :active-text-color="variablesJson.menuActiveText">
                <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
            </el-menu>
        </el-scrollbar>
    </div>
</template>
    
<script setup>
import Logo from './Logo.vue'
import { useSettingsStore } from '@/store/settings'
import { usePermissionStore } from '@/store/permission'
import { computed } from 'vue';
import { useRoute } from 'vue-router'
import variables from '@/styles/variables.scss'
import SidebarItem from './SidebarItem.vue'

const settingsStore = useSettingsStore()
const showLogo = computed(() => settingsStore.sidebarLogo)
const isCollapse = computed(() => settingsStore.sidebarStatus)

const route = useRoute()
const activeMenu = computed(() => {
    const { meta, path } = route
    // if set path, the sidebar will highlight the path you set
    if (meta.activeMenu) {
        return meta.activeMenu
    }
    return path
})

const permissionStore = usePermissionStore()
const routes = computed(() => permissionStore.routes)

//change  scss variable to js
//导出scss定义的样式变量
//vite无法获取scss变量https://github.com/vitejs/vite/issues/1279
const dillScssExportToJson = (scssExportJson) => {
    const jsonString = scssExportJson.replace(/:export\s*/, '').replace(/[\s+\r\n]/g, '')
    const scssJson = {}
    jsonString
        .slice(1, jsonString.length - 2)
        .split(';')
        .forEach((fItem) => {
            const arr = fItem.split(':')
            scssJson[arr[0]] = arr[1]
        })
    return scssJson
}
const variablesJson = dillScssExportToJson(variables)
</script>