<template>
  <div class="streamline-container">
    <Navbar />
    <el-scrollbar class="main-container">
      <app-main />
    </el-scrollbar>
  </div>
</template>
<script setup>
import { AppMain } from '@/layout/components/index'
import { Navbar } from '@/layout/streamline/components/index'
</script>
<style lang="scss" scoped>
.streamline-container {
  .main-container {
    height: calc(100vh - 50px);
    background-color: #f5f5f5;
  }
}
</style>
