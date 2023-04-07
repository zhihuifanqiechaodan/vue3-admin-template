<template>
  <div class="role-container">
    <el-button @click="handleAddRole" type="primary">New Role</el-button>
    <el-table :data="roleList" border>
      <el-table-column prop="name" label="Name" align="center" />
      <el-table-column prop="description" label="Description" align="center" />
      <el-table-column fixed="right" label="Operations" align="center">
        <template #default="scoped">
          <el-button @click="handleEdit(scoped)" type="primary">Edit</el-button>
          <el-button @click="handleDelete(scoped)" type="danger"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <permission-dialog
      ref="permissionDialogRef"
      v-model:dialogVisible="permissionDialogVisible"
      :routesData="routesData"
      :roleInfo="roleInfo"
      :dialogType="dialogType"
    />
  </div>
</template>

<script setup name="PermissionRole">
import { reactive, onMounted, toRefs, computed, nextTick } from 'vue'
import { asyncRoutes } from '@/router/index'
import path from 'path-browserify'
import PermissionDialog from './components/permission-dialog.vue'
import { cloneDeep as _cloneDeep } from 'lodash'
import { ElMessageBox } from 'element-plus'

const state = reactive({
  routes: [],
  roleList: [],
  permissionDialogVisible: false,
  dialogType: 'edit',
  roleInfo: {
    name: '',
    description: '',
    routes: []
  },
  permissionDialogRef: null
})

const {
  roleList,
  permissionDialogVisible,
  permissionDialogRef,
  roleInfo,
  dialogType
} = toRefs(state)

onMounted(() => {
  state.routes = generateRoutes(_cloneDeep(asyncRoutes))
  state.roleList.push({
    name: 'admin',
    description: '超级管理员，拥有所有的页面权限',
    routes: _cloneDeep(asyncRoutes)
  })
})

const routesData = computed(() => state.routes)

const generateRoutes = (routes, basePath = '/') => {
  const res = []

  for (let route of routes) {
    // skip some route
    if (route.hidden) {
      continue
    }
    const _onlyOneShowingChild = onlyOneShowingChild(route.children, route)
    if (route.children && _onlyOneShowingChild && !route.alwaysShow) {
      route = _onlyOneShowingChild
    }

    const data = {
      path: path.resolve(basePath, route.path),
      title: route.meta && route.meta.title
    }

    // recursive child routes
    if (route.children) {
      data.children = generateRoutes(route.children, data.path)
    }
    res.push(data)
  }
  return res
}

const generateArr = (routes) => {
  let data = []
  routes.forEach((route) => {
    data.push(route)
    if (route.children) {
      const temp = generateArr(route.children)
      if (temp.length > 0) {
        data = [...data, ...temp]
      }
    }
  })
  return data
}

const onlyOneShowingChild = (children = [], parent) => {
  let onlyOneChild = null
  const showingChildren = children.filter((item) => !item.hidden)

  // When there is only one child route, the child route is displayed by default
  if (showingChildren.length === 1) {
    onlyOneChild = showingChildren[0]
    onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
    return onlyOneChild
  }

  // Show parent if there are no child route to display
  if (showingChildren.length === 0) {
    onlyOneChild = { ...parent, path: '', noShowingChildren: true }
    return onlyOneChild
  }

  return false
}

const handleAddRole = () => {
  state.dialogType = 'new'
  state.roleInfo = {
    name: '',
    description: '',
    routes: []
  }
  state.permissionDialogVisible = true
}

const handleEdit = ({ row }) => {
  state.dialogType = 'edit'
  state.roleInfo = _cloneDeep(row)
  state.permissionDialogVisible = true
  nextTick(() => {
    const routes = generateRoutes(state.roleInfo.routes)
    state.permissionDialogRef.treeRef.setCheckedNodes(generateArr(routes))
  })
}

const handleDelete = ({ $index }) => {
  ElMessageBox.confirm(
    'proxy will permanently delete the file. Continue?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }
  )
    .then(() => {
      state.roleList.splice($index, 1)
    })
    .catch(() => {})
}
</script>

<style lang="scss" scoped>
.role-container {
  margin: 20px;
  padding: 20px;
  background-color: #fff;
}
</style>
