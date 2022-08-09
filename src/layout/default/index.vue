<template>
    <div class="default-container">
        <sidebar class="sidebar" />
        <div class="main-container">
            <div class="fixed-header">
                <tags-view class="tags-view" />
                <navbar />
            </div>
            <el-scrollbar class="main-scrollbar">
                <app-main />
            </el-scrollbar>
        </div>

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
        flex: 1;
        padding: 20px;
        box-sizing: border-box;

        .fixed-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 10px;
            box-sizing: border-box;
            background-color: #f5f5f5;

            .tags-view {
                flex: 1;
                margin-right: 10px;
            }
        }

        .main-scrollbar {
            // navbar height 50 padding 上下各20
            height: calc(100vh - 90px);
        }
    }
}
</style>