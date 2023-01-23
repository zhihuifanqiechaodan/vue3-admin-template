<template>
  <div @click="handleDrawerOpen" class="setting-wrapper">
    <svg-icon name="setting" class="setting" />
  </div>
  <div class="drawer-wrapper">
    <el-drawer
      v-model="showSettings"
      title="系统配置"
      direction="rtl"
      size="310px"
    >
      <el-divider>布局方式</el-divider>
      <div class="layout-wrapper">
        <el-row :gutter="20">
          <el-col @click="handleLayoutMode('Default')" :span="12">
            <div
              class="default"
              :class="{
                'active-layout': layoutMode === 'Default' ? true : false
              }"
            >
              <div class="sidebar"></div>
              <div class="main-wrapper">
                <div class="main-header"></div>
                <div class="main"></div>
              </div>
              <div class="introduce">默认</div>
            </div>
          </el-col>
          <el-col @click="handleLayoutMode('Classic')" :span="12">
            <div
              class="classic"
              :class="{
                'active-layout': layoutMode === 'Classic' ? true : false
              }"
            >
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
            <div
              class="streamline"
              :class="{
                'active-layout': layoutMode === 'Streamline' ? true : false
              }"
            >
              <div class="main-wrapper">
                <div class="main-header"></div>
                <div class="main"></div>
              </div>
              <div class="introduce">单栏</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-divider>导航菜单</el-divider>
      <div class="navbar-menu">
        <div class="navbar-menu-item">
          <div class="label">导航菜单栏背景色</div>
          <el-color-picker
            v-model="menuBackgroundColor"
            size="default"
            class="value"
          />
        </div>
        <div class="navbar-menu-item">
          <div class="label">导航菜单栏文字颜色</div>
          <el-color-picker
            v-model="menuTextColor"
            size="default"
            class="value"
          />
        </div>
        <div class="navbar-menu-item">
          <div class="label">导航菜单激活项背景色</div>
          <el-color-picker
            v-model="menuActiveBackgroundColor"
            size="default"
            class="value"
          />
        </div>
        <div class="navbar-menu-item">
          <div class="label">导航菜单栏激活项文字颜色</div>
          <el-color-picker
            v-model="menuActiveTextColor"
            size="default"
            class="value"
          />
        </div>
        <div class="navbar-menu-item">
          <div class="label">导航菜单(LOGO)</div>
          <el-switch v-model="menuLogo" size="default" class="value" />
        </div>
        <div class="navbar-menu-item">
          <div class="label">侧边菜单宽度(展开时)</div>
          <el-input
            v-model="menuWidth"
            type="number"
            :step="10"
            size="default"
            class="value"
          >
            <template #append>px</template>
          </el-input>
        </div>
        <div class="navbar-menu-item">
          <div class="label">侧边菜单水平折叠</div>
          <el-switch v-model="menuCollapse" size="default" class="value" />
        </div>
        <div class="navbar-menu-item">
          <div class="label">侧边菜单手风琴</div>
          <el-switch v-model="menuUniqueOpened" size="default" class="value" />
        </div>
      </div>
      <div class="default-config">
        <el-popconfirm
          @confirm="restoreDefault"
          confirm-button-text="确认"
          cancel-button-text="取消"
          title="确定要恢复全部配置到默认值吗？"
        >
          <template #reference>
            <el-button type="info" size="default">恢复默认</el-button>
          </template>
        </el-popconfirm>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSettingsStore } from '@/store/settings'

const settingsStore = useSettingsStore()
const showSettings = computed({
  get() {
    return settingsStore.showSettings
  },
  set() {
    settingsStore.changeSetting({
      key: 'showSettings',
      value: !settingsStore.showSettings
    })
  }
})
const menuBackgroundColor = computed({
  get() {
    return settingsStore.menuBackgroundColor
  },
  set(value) {
    settingsStore.changeSetting({
      key: 'menuBackgroundColor',
      value
    })
  }
})
const menuTextColor = computed({
  get() {
    return settingsStore.menuTextColor
  },
  set(value) {
    settingsStore.changeSetting({
      key: 'menuTextColor',
      value
    })
  }
})
const menuActiveBackgroundColor = computed({
  get() {
    return settingsStore.menuActiveBackgroundColor
  },
  set(value) {
    settingsStore.changeSetting({
      key: 'menuActiveBackgroundColor',
      value
    })
  }
})
const menuActiveTextColor = computed({
  get() {
    return settingsStore.menuActiveTextColor
  },
  set(value) {
    settingsStore.changeSetting({
      key: 'menuActiveTextColor',
      value
    })
  }
})
const menuLogo = computed({
  get() {
    return settingsStore.menuLogo
  },
  set(value) {
    settingsStore.changeSetting({
      key: 'menuLogo',
      value
    })
  }
})
const menuWidth = computed({
  get() {
    return settingsStore.menuWidth
  },
  set(value) {
    settingsStore.changeSetting({
      key: 'menuWidth',
      value
    })
  }
})
const menuCollapse = computed({
  get() {
    return settingsStore.menuCollapse
  },
  set(value) {
    settingsStore.changeSetting({
      key: 'menuCollapse',
      value: value
    })
  }
})
const menuUniqueOpened = computed({
  get() {
    return settingsStore.menuUniqueOpened
  },
  set(value) {
    settingsStore.changeSetting({
      key: 'menuUniqueOpened',
      value: value
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

const restoreDefault = () => settingsStore.restoreDefault()
</script>

<style lang="scss" scoped>
.setting-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  transition: background 0.3s;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }

  .setting {
    font-size: 18px;
    color: #5a5e66;
  }
}

.drawer-wrapper {
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
          background-color: #dcdfe6;
        }

        .main {
          flex: 1;
          background-color: #f2f6fc;
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
          background-color: #dcdfe6;
        }

        .main {
          flex: 1;
          background-color: #f2f6fc;
        }
      }
    }
  }

  .navbar-menu {
    .navbar-menu-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      .label {
        margin-right: 10px;
      }

      .value {
        flex: 1;
      }
    }
  }

  .default-config {
    display: flex;
    justify-content: center;
  }
}
</style>

<style lang="scss">
.drawer-wrapper {
  .el-row {
    margin-bottom: 20px;
  }

  .el-drawer__header {
    margin-bottom: 0;
  }
}

.default-config {
  .el-button {
    width: 100%;
  }
}
</style>
