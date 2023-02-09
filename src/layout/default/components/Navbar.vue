<template>
  <div class="navbar">
    <search />
    <screenfull />
    <size-select />
    <error-log />
    <user />
    <setting />
  </div>
</template>
<script setup>
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
  justify-content: flex-end;
  height: 40px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
}
</style>
