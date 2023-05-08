<template>
  <div class="menu-horizontal">
    <Logo v-if="showLogo" :menuCollapse="true" class="logo" />
    <el-menu
      :default-active="activeMenu"
      :collapse-transition="false"
      mode="horizontal"
      :background-color="menuBackgroundColor"
      :text-color="menuTextColor"
      :active-text-color="menuActiveTextColor"
      class="horizontal-menus"
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </div>
</template>
<script setup>
import Logo from './Logo.vue'
import { useSettingsStore } from '@/store/settings'
import { usePermissionStore } from '@/store/permission'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SidebarItem from '@/layout/components/Sidebar/SidebarItem.vue'

const settingsStore = useSettingsStore()
const showLogo = computed(() => settingsStore.menuLogo)
const menuBackgroundColor = computed(() => settingsStore.menuBackgroundColor)
const menuTextColor = computed(() => settingsStore.menuTextColor)
const menuActiveTextColor = computed(() => settingsStore.menuActiveTextColor)

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
</script>

<style lang="scss" scoped>
.menu-horizontal {
  display: flex;
  align-items: center;
  height: 100%;

  .logo {
    width: 64px;
  }

  .horizontal-menus {
    flex: 1;
    width: 50%;
    height: 50px;
    border-bottom: none;

    .el-sub-menu__title {
      border-bottom: none;
    }
  }
}
</style>

<style lang="scss">
.horizontal-menus {
  .el-menu-item {
    height: 100%;
  }

  .el-sub-menu .el-sub-menu__title,
  .el-sub-menu.is-active .el-sub-menu__title {
    height: 100%;
    border-bottom: none;
  }
}
</style>
