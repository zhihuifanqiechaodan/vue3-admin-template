<template>
    <div :class="{ 'has-logo': showLogo }" class="sidebar-container" :style="{ 'width': sidebarWidth + 'px' }">
        <Logo v-if="showLogo" :collapse="!isCollapse" />
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <!-- <el-menu :default-active="activeMenu" :collapse="!isCollapse" :unique-opened="false"
                :collapse-transition="false" mode="vertical" :background-color="variablesJson.menuBg"
                :text-color="variablesJson.menuText" :active-text-color="variablesJson.menuActiveText">
                <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
            </el-menu> -->
            <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="!isCollapse">
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon>
                            <location />
                        </el-icon>
                        <span>Navigator One</span>
                    </template>
                    <el-menu-item-group>
                        <template #title><span>Group One</span></template>
                        <el-menu-item index="1-1">item one</el-menu-item>
                        <el-menu-item index="1-2">item two</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="Group Two">
                        <el-menu-item index="1-3">item three</el-menu-item>
                    </el-menu-item-group>
                    <el-sub-menu index="1-4">
                        <template #title><span>item four</span></template>
                        <el-menu-item index="1-4-1">item one</el-menu-item>
                    </el-sub-menu>
                </el-sub-menu>
                <el-menu-item index="2">
                    <el-icon>
                        <icon-menu />
                    </el-icon>
                    <template #title>Navigator Two</template>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                    <el-icon>
                        <document />
                    </el-icon>
                    <template #title>Navigator Three</template>
                </el-menu-item>
                <el-menu-item index="4">
                    <el-icon>
                        <setting />
                    </el-icon>
                    <template #title>Navigator Four</template>
                </el-menu-item>
            </el-menu>
        </el-scrollbar>
    </div>
</template>
    
<script setup>
import Logo from './Logo.vue'
import { useSettingsStore } from '@/store/settings'
import { usePermissionStore } from '@/store/permission'
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router'
import variables from '@/styles/variables.scss'
import SidebarItem from './SidebarItem.vue'

const settingsStore = useSettingsStore()
const showLogo = computed(() => settingsStore.sidebarLogo)
const isCollapse = computed(() => settingsStore.sidebarOpenStatus)
const sidebarWidth = computed(() => settingsStore.sidebarWidth)

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

<style lang="scss" scoped>
.sidebar-container {}
</style>