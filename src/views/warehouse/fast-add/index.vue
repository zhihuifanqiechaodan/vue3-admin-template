<template>
  <div>
    <el-button type="primary">大小控制</el-button>
    <el-input v-model="zhongliang" placeholder="请输入重量" />
  </div>
</template>

<script setup name="WarehouseFastAdd">
import { reactive, toRef } from 'vue'

const state = reactive({
  zhongliang: ''
})

const { zhongliang } = toRef(state)
</script>

<style lang="scss"></style>
