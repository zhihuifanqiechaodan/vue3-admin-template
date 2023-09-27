<template>
  <div v-loading="loading" class="menu-container">
    <el-button @click="handleMenuCreate">创建</el-button>

    <div class="tree-wrapper">
      <el-tree
        @node-drop="nodeDrop"
        :allow-drop="allowDrop"
        :data="menuList"
        draggable
        default-expand-all
        node-key="id"
        :props="{
          children: 'children',
          label: 'title'
        }"
      >
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <span>{{ node.label }}{{ data.type === 0 ? '【目录】' : '' }}</span>
            <span>
              <a style="margin-left: 8px" @click="handleMenuEdit(node, data)">
                编辑
              </a>
            </span>
          </span>
        </template>
      </el-tree>
      <div class="update-button">
        <el-button
          :loading="updateSortLoading"
          @click="handleUpdateTreeSort"
          type="primary"
          >更新排序
        </el-button>
      </div>
    </div>
    <Drawer
      :isEdit="isEdit"
      :menuForm="menuForm"
      :originalMenuList="originalMenuList"
      v-model:menuDrawerVisible="menuDrawerVisible"
      @initData="initData"
    />
  </div>
</template>

<script setup>
import { onMounted, reactive, toRefs } from 'vue'
import Drawer from './components/Drawer.vue'
import { cloneDeep as _cloneDeep } from 'lodash-es'
import { addSystemMenuGetAllMenuList } from '@/api/system'
import { defaultLayoutRoute } from '@/router'
import { menuListSort } from '@/utils/index'
import { ElMessageBox } from 'element-plus'

const defaultMenuForm = {
  type: 0,
  layout: defaultLayoutRoute.layout,
  auth: true,
  hidden: false,
  show: false,
  title: '',
  path: '',
  icon: 'menu',
  cache: false,
  affix: false,
  breadcrumb: true,
  activeMenu: '',
  buttonPermissions: []
}

const state = reactive({
  isEdit: false,
  menuDrawerVisible: false,
  menuForm: null,
  menuList: [],
  loading: false,
  originalMenuList: [],
  updateSortLoading: false
})

const {
  isEdit,
  menuDrawerVisible,
  menuForm,
  menuList,
  loading,
  originalMenuList,
  updateSortLoading
} = toRefs(state)

onMounted(() => {
  initData()
})

const initData = async () => {
  state.loading = true

  try {
    const menuList = await addSystemMenuGetAllMenuList()

    state.originalMenuList = menuList

    state.menuList = menuListSort(convertToTree(menuList))
  } catch (error) {
    console.log('🚀 ~ file: menu.vue:81 ~ onMounted ~ error:', error)
  }
  state.loading = false
}

const handleMenuCreate = () => {
  state.menuForm = _cloneDeep(defaultMenuForm)

  state.menuDrawerVisible = true

  state.isEdit = false
}

const allowDrop = (draggingNode, dropNode, type) => {
  if (draggingNode.data.type === 0 && dropNode.data.type === 1) {
    return type !== 'inner'
  }

  if (draggingNode.data.type === 1 && dropNode.data.type === 1) {
    return type !== 'inner'
  }
  return true
}

const nodeDrop = (draggingNode, dropNode, dropType) => {
  if (dropType === 'inner') {
    draggingNode.data.parentId = dropNode.data.id
  } else {
    draggingNode.data.parentId = dropNode.data.parentId
  }
}

const convertToTree = (nodes, parentId = 0) => {
  const result = []

  for (const node of nodes) {
    if (node.parentId === parentId) {
      const newNode = { ...node }
      const children = convertToTree(nodes, node.id)
      if (children.length > 0) {
        newNode.children = children
      }
      result.push(newNode)
    }
  }
  return result
}

// const flattenTree = (tree, result = []) => {
//   for (const node of tree) {
//     const { children, ...rest } = node
//     result.push(rest)
//     if (children) {
//       flattenTree(children, result)
//     }
//   }
//   return result
// }

const updateMenuSortIndex = (menuList) => {
  menuList.forEach((item, index) => {
    item.sortIndex = menuList.length - 1 - index

    if (item.children) {
      updateMenuSortIndex(item.children)
    }
  })
}

const handleUpdateTreeSort = async () => {
  ElMessageBox.confirm('更新排序后将刷新页面', 'Tips', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      state.updateSortLoading = true

      updateMenuSortIndex(state.menuList)

      try {
        // await menuApi.addMenuUpdateSort({
        //   menuList: flattenTree(state.menuList)
        // })

        location.reload()
      } catch (error) {
        console.log('🚀 ~ file: menu.vue:192 ~ .then ~ error:', error)
      }

      state.updateSortLoading = false
    })
    .catch(() => {})
}

const handleMenuEdit = (node, data) => {
  state.isEdit = true

  state.menuForm = data

  state.menuDrawerVisible = true
}
</script>

<style lang="scss" scoped>
.menu-container {
  margin: 20px;

  .tree-wrapper {
    margin-top: 20px;
    padding: 20px;
    background-color: #fff;

    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }

    .update-button {
      padding-top: 20px;
    }
  }
}
</style>
