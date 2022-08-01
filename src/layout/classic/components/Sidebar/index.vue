<template>
    <div class="sidebar-container">
        <Logo v-if="showLogo" :menuCollapse="menuCollapse" />
        <el-scrollbar class="vertical-menus-scrollbar">
            <el-menu :default-active="activeMenu" :collapse="menuCollapse" :collapse-transition="false" mode="vertical"
                :background-color="menuBackgroundColor" :text-color="menuTextColor"
                :active-text-color="menuActiveTextColor" class="vertical-menus">
                <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script setup>
import Logo from "./Logo.vue";
import { useSettingsStore } from "@/store/settings";
import { usePermissionStore } from "@/store/permission";
import { computed } from "vue";
import { useRoute } from "vue-router";
import SidebarItem from "./SidebarItem.vue";

const settingsStore = useSettingsStore();
const showLogo = computed(() => settingsStore.menuLogo);
const menuCollapse = computed(() => settingsStore.menuCollapse);
const menuBackgroundColor = computed(() => settingsStore.menuBackgroundColor);
const menuActiveBackgroundColor = computed(
    () => settingsStore.menuActiveBackgroundColor
);
const menuTextColor = computed(() => settingsStore.menuTextColor);
const menuActiveTextColor = computed(() => settingsStore.menuActiveTextColor);
const menuWidth = computed({
    get() {
        return settingsStore.menuWidth + "px";
    },
});

const menuHeight = computed({
    get() {
        return showLogo.value ? "calc(100vh - 50px)" : "calc(100vh - 0px)";
    },
});

const route = useRoute();
const activeMenu = computed(() => {
    const { meta, path } = route;
    // if set path, the sidebar will highlight the path you set
    if (meta.activeMenu) {
        return meta.activeMenu;
    }
    return path;
});

const permissionStore = usePermissionStore();
const routes = computed(() => permissionStore.routes);
</script>

<style lang="scss" scoped>
.sidebar-container {
    transition: width 0.3s;
    width: v-bind(menuWidth);
    background-color: v-bind(menuBackgroundColor);


    .vertical-menus-scrollbar {
        height: v-bind(menuHeight);

        .vertical-menus {
            border: none;
            user-select: none;
        }
    }

}
</style>


<style lang="scss">
.vertical-menus {

    .el-sub-menu .svg-icon,
    .el-menu-item .svg-icon {
        margin-right: 5px;
        width: 24px;
    }
}
</style>