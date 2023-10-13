<template>
  <div class="user-container">
    <div v-loading="loading" class="user-wrapper">
      <div class="table-header">
        <el-button @click="initData" type="info">刷新</el-button>
        <el-button @click="handleAddUser" type="primary">添加</el-button>
      </div>
      <el-table :data="userList" style="width: 100%" border>
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="roleId" label="角色ID" />
        <el-table-column prop="roleName" label="角色名称" />
        <el-table-column prop="username" label="账号" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag :type="scope.row.status === 0 ? 'success' : 'danger'">{{
              scope.row.status === 0 ? '启用' : '禁用'
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <el-button
              :disabled="scope.row.type === 1"
              type="primary"
              @click.prevent="handleEditUser(scope.row)"
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        @pagination="handlePaginationChange"
        :total="total"
        v-model:pageSize="pageSize"
        v-model:currentPage="currentPage"
      />
    </div>
    <Drawer
      v-model:userInfo="userInfo"
      v-model:drawerVisible="userDrawerVisible"
      :drawerMode="userDrawerMode"
      @initData="initData"
    />
  </div>
</template>

<script setup>
import { addSystemUserGetUserList } from '@/api/system'
import { onMounted, reactive, toRefs } from 'vue'
import { cloneDeep as _cloneDeep } from 'lodash-es'
import Drawer from './components/Drawer.vue'

const defaultUserInfo = {
  roleId: '',
  username: '',
  password: '',
  status: 0
}

const state = reactive({
  loading: false,
  userList: [],
  pageSize: 20,
  currentPage: 1,
  total: 0,
  userDrawerVisible: false,
  userDrawerMode: 'create',
  userInfo: null
})

const {
  loading,
  userList,
  pageSize,
  currentPage,
  total,
  userDrawerVisible,
  userDrawerMode,
  userInfo
} = toRefs(state)

onMounted(() => {
  initData()
})

const initData = async () => {
  state.loading = true

  try {
    const { list, total } = await addSystemUserGetUserList({
      username: '',
      pageNo: state.currentPage,
      pageSize: state.pageSize,
      roleId: '',
      roleName: '',
      status: ''
    })

    state.userList = list

    state.total = total
  } catch (error) {
    console.log('🚀 ~ file: user.vue:25 ~ initData ~ error:', error)
  }
  state.loading = false
}

const handlePaginationChange = ({ pageSize, currentPage }) => {
  console.log(pageSize, currentPage)
}

const handleEditUser = (row) => {
  state.userInfo = row

  state.userDrawerMode = 'edit'

  state.userDrawerVisible = true
}

const handleAddUser = () => {
  state.userInfo = _cloneDeep(defaultUserInfo)

  state.userDrawerVisible = true

  state.userDrawerMode = 'create'
}
</script>

<style lang="scss" scoped>
.user-container {
  margin: 20px;
  padding: 20px;
  background: #ffffff;
}
</style>
