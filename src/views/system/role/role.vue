<template>
  <div v-loading="loading" class="role-container">
    <div class="table-header">
      <el-button @click="initData" type="info">刷新</el-button>
      <el-button @click="handleAddRole" type="primary">添加</el-button>
    </div>
    <el-table :data="roleList" style="width: 100%" border>
      <el-table-column prop="id" label="id" />
      <el-table-column prop="name" label="角色名称" />
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-tag v-if="scope.row.status" type="danger">禁用</el-tag>
          <el-tag v-else type="success">启用</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button @click="handleEditRole(scope.row)" link type="primary"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <Drawer
      v-model:ruleInfo="ruleInfo"
      v-model:drawerVisible="ruleDrawerVisible"
      :drawerMode="ruleDrawerMode"
      :menuList="menuList"
    />
    <Pagination
      @pagination="handlePaginationChange"
      :total="total"
      v-model:pageSize="pageSize"
      v-model:currentPage="currentPage"
    />
  </div>
</template>

<script setup>
import { reactive, toRefs, onMounted } from 'vue'
import {
  addSystemRoleGetRoleList,
  addSystemMenuGetMenuList
} from '@/api/system'
import Drawer from './components/Drawer.vue'
import { convertToTree } from '@/utils/index'
import { cloneDeep as _cloneDeep } from 'lodash-es'

const defaultRuleInfo = {
  name: '',
  menuIds: [],
  status: 0
}

const state = reactive({
  loading: false,
  roleList: [],
  menuList: [],
  ruleInfo: null,
  pageSize: 20,
  currentPage: 1,
  total: 0,
  ruleDrawerVisible: false,
  ruleDrawerMode: 'create'
})

const {
  loading,
  roleList,
  menuList,
  ruleInfo,
  pageSize,
  currentPage,
  total,
  ruleDrawerVisible,
  ruleDrawerMode
} = toRefs(state)

onMounted(() => {
  initData()
})

const initData = async () => {
  state.loading = true

  try {
    const { list, total } = await addSystemRoleGetRoleList({
      name: '',
      pageNo: state.currentPage,
      pageSize: state.pageSize
    })

    const menuList = await addSystemMenuGetMenuList()

    state.total = total

    state.roleList = list

    state.menuList = convertToTree(menuList)
  } catch (error) {
    console.log('🚀 ~ file: role.vue:47 ~ initData ~ error:', error)
  }

  state.loading = false
}

const handleAddRole = () => {
  state.ruleInfo = _cloneDeep(defaultRuleInfo)

  state.ruleDrawerVisible = true

  state.ruleDrawerMode = 'create'
}

const handleEditRole = (row) => {
  state.ruleInfo = row

  state.ruleDrawerVisible = true

  state.ruleDrawerMode = 'edit'
}

const handlePaginationChange = ({ pageSize, currentPage }) => {
  console.log(pageSize, currentPage)
}
</script>

<style lang="scss" scoped>
.role-container {
  background-color: #fff;
  padding: 20px;
  margin: 20px;

  .table-header {
    padding-bottom: 20px;
  }
}
</style>
