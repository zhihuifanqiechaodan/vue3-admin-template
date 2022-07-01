<template>
    <div class="app-wrapper">
        <Sidebar class="sidebar-container" />
        <div class="main-container">
            <router-view />
        </div>
    </div>
</template>
    
<script setup >
import { Sidebar } from './components'

</script>
    
<style lang="scss" scoped>
// base color
$blue: #324157;
$light-blue: #3A71A8;
$red: #C03639;
$pink: #E65D6E;
$green: #30B08F;
$tiffany: #4AB7BD;
$yellow: #FEC171;
$panGreen: #30B08F;

// sidebar
$menuText: #bfcbd9;
$menuActiveText: #409EFF;
$subMenuActiveText: #f4f4f5; // https://github.com/ElemeFE/element/issues/12951

$menuBg: #304156;
$menuHover: #263445;

$subMenuBg: #1f2d3d;
$subMenuHover: #001528;

$sideBarWidth: 210px;

.app-wrapper {
    position: relative;
    width: 100%;
    height: 100%;

    .sidebar-container {
        transition: width 0.28s;
        width: $sideBarWidth  !important;
        background-color: $menuBg;
        height: 100%;
        position: fixed;
        font-size: 0px;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1001;
        overflow: hidden;
    }

    .main-container {
        min-height: 100%;
        transition: margin-left .28s;
        margin-left: $sideBarWidth;
        position: relative;
    }
}
</style>