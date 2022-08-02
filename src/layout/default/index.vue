<template>
    <div class="default-container">
        <sidebar class="sidebar" />
        <el-scrollbar class="main-container">
            <div class="fixed-header">
                <tags-view class="tags-view" />
                <navbar />
            </div>
            <app-main />
        </el-scrollbar>
    </div>
</template>
<script setup>
import { Sidebar, AppMain } from '@/layout/components/index';
import { TagsView, Navbar } from '@/layout/default/components/index'
</script>
<style lang="scss" scoped>
.default-container {
    display: flex;
    flex-direction: row;
    background-color: #f5f5f5;

    .sidebar {
        margin: 20px;
        margin-right: 0;
    }

    .main-container {
        position: relative;
        flex: 1;
        height: 100vh;
        padding: 0 20px;
        padding-bottom: 20px;
        box-sizing: border-box;

        .fixed-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            padding: 20px;
            padding-bottom: 10px;
            box-sizing: border-box;
            background-color: #f5f5f5;

            .tags-view {
                flex: 1;
                margin-right: 10px;
            }
        }
    }
}
</style>