<template>
    <div class="setting-wrapper">
        <svg-icon @click="handleDrawerOpen" name="setting" class="setting" />
    </div>
    <div class="drawer-wrapper">
        <el-drawer v-model="showSettings" title="系统配置" direction="rtl" size="310px">
            <el-divider>布局方式</el-divider>
            <div class="layout-wrapper">
                <el-row :gutter="20">
                    <el-col @click="handleLayoutMode('Default')" :span="12">
                        <div class="default" :class="{ 'active-layout': layoutMode === 'Default' ? true : false }">
                            <div class="sidebar"></div>
                            <div class="main-wrapper">
                                <div class="main-header"></div>
                                <div class="main"></div>
                            </div>
                            <div class="introduce">默认</div>
                        </div>
                    </el-col>
                    <el-col @click="handleLayoutMode('Classic')" :span="12">
                        <div class="classic" :class="{ 'active-layout': layoutMode === 'Classic' ? true : false }">
                            <div class="sidebar"></div>
                            <div class="main-wrapper">
                                <div class="main-header"></div>
                                <div class="main"></div>
                            </div>
                            <div class="introduce">经典</div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col @click="handleLayoutMode('Streamline')" :span="12">
                        <div class="streamline"
                            :class="{ 'active-layout': layoutMode === 'Streamline' ? true : false }">
                            <div class="main-wrapper">
                                <div class="main-header"></div>
                                <div class="main"></div>
                            </div>
                            <div class="introduce">单栏</div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-drawer>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useSettingsStore } from '@/store/settings';

const settingsStore = useSettingsStore()
const showSettings = computed({
    get() { return settingsStore.showSettings },
    set() {
        settingsStore.changeSetting({
            key: 'showSettings',
            value: !settingsStore.showSettings
        })
    }
})
const handleDrawerOpen = () => {
    settingsStore.changeSetting({
        key: 'showSettings',
        value: true
    })
}

const layoutMode = computed(() => settingsStore.layoutMode)
const handleLayoutMode = (mode) => {
    settingsStore.changeSetting({
        key: 'layoutMode',
        value: mode
    })
}
</script>

<style lang="scss" scoped>
.setting-wrapper {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 10px;
    transition: background .3s;
    cursor: pointer;

    &:hover {
        background: rgba(0, 0, 0, .025)
    }

    .setting {
        font-size: 18px;
        color: #5a5e66;
    }


}

.drawer-wrapper {
    .el-row {
        margin-bottom: 20px;
    }

    .layout-wrapper {
        .default {
            position: relative;
            display: flex;
            height: 100px;
            padding: 5px;
            box-sizing: border-box;

            &.active-layout {
                border: 1px solid #409eff;
            }

            .introduce {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                color: #a0cfff;
            }

            .sidebar {
                width: 20%;
                background-color: #ebeef5;
            }

            .main-wrapper {
                flex: 1;
                display: flex;
                flex-direction: column;
                margin-left: 5px;

                .main-header {
                    height: 10%;
                    background-color: #ebeef5;
                }

                .main {
                    flex: 1;
                    margin-top: 5px;
                    background-color: #ebeef5;
                }
            }
        }

        .classic {
            position: relative;
            display: flex;
            height: 100px;
            box-sizing: border-box;

            &.active-layout {
                border: 1px solid #409eff;
            }

            .introduce {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                color: #a0cfff;
            }

            .sidebar {
                width: 20%;
                background-color: #ebeef5;
            }

            .main-wrapper {
                flex: 1;
                display: flex;
                flex-direction: column;

                .main-header {
                    height: 10%;
                    background-color: #DCDFE6;
                }

                .main {
                    flex: 1;
                    background-color: #F2F6FC;
                }
            }
        }

        .streamline {
            position: relative;
            display: flex;
            height: 100px;
            box-sizing: border-box;

            &.active-layout {
                border: 1px solid #409eff;
            }

            .introduce {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                color: #a0cfff;
            }

            .main-wrapper {
                flex: 1;
                display: flex;
                flex-direction: column;

                .main-header {
                    height: 10%;
                    background-color: #DCDFE6;
                }

                .main {
                    flex: 1;
                    background-color: #F2F6FC;
                }
            }
        }
    }
}
</style>

<style lang="scss">
.drawer-wrapper {
    .el-drawer__header {
        margin-bottom: 0;
    }
}
</style>