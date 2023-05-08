<template>
  <div class="navbar-wrapper">
    <div class="navbar-left">
      <MenuHorizontal />
    </div>
    <div class="navbar-right">
      <Search />
      <ErrorLog />
      <Screenfull />
      <SizeSelect />
      <User />
      <Setting />
    </div>
  </div>
</template>
<script setup>
import {
  Search,
  ErrorLog,
  Screenfull,
  SizeSelect,
  User,
  Setting,
  MenuHorizontal
} from '@/layout/components/index'
</script>
<style lang="scss" scoped>
.navbar-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background-color: #fff;
  border-bottom: solid 1px #e6e6e6;
  box-sizing: border-box;

  .navbar-left {
    flex: 1;
    width: 50%;
    height: 100%;
  }

  .navbar-right {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 10px;
  }
}
</style>
