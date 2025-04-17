<template>
  <div class="app-container role-container">
    <div class="feature-wrapper">
      <el-button v-hasPermission="1010" type="primary">添加用户</el-button>
      <el-button type="primary" @click="getSelectedKeys">获取选中项</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column fixed prop="date" label="Date" width="150" />
      <el-table-column prop="name" label="Name" width="120" />
      <el-table-column prop="state" label="State" width="120" />
      <el-table-column prop="city" label="City" width="120" />
      <el-table-column prop="address" label="Address" width="600" />
      <el-table-column prop="zip" label="Zip" width="120" />
      <el-table-column fixed="right" label="Operations" min-width="120">
        <template #default>
          <el-button link type="primary" size="small"> Detail </el-button>
          <el-button link type="primary" size="small">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <permission-tree ref="permissionTreeRef" :default-checked-keys="[1]" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PermissionTree from '@/components/PermissionTree/index.vue'

const permissionTreeRef = ref(null)
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home'
  }
]

const getSelectedKeys = () => {
  const keys = permissionTreeRef.value?.getCheckedKeys()
  console.log('选中的节点:', keys)
}
</script>

<style scoped lang="scss">
.role-container {
  .feature-wrapper {
    padding-bottom: 20px;
  }
}
</style>
