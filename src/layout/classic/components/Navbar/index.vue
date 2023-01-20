<template>
  <div class="navbar">
    <div class="left-menu">
      <hamburger />
      <breadcrumb />
    </div>
    <div class="right-menu">
      <search />
      <error-log />
      <screenfull />
      <size-select />
      <user />
      <Setting />
    </div>
  </div>
</template>

<script setup>
import Hamburger from './Hamburger.vue'
import Breadcrumb from './Breadcrumb.vue'
import {
  Search,
  ErrorLog,
  Screenfull,
  SizeSelect,
  User,
  Setting
} from '@/layout/components/index'
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  box-sizing: border-box;

  .left-menu {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .right-menu {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    margin-right: 10px;

    .right-menu-item {
      padding: 0 10px;
      color: #5a5e66;
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
