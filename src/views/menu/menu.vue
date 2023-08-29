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
      />
      <div class="update-button">
        <el-button @click="handleUpdateTreeSort" type="primary"
          >更新排序
        </el-button>
      </div>
    </div>
    <Drawer
      :isEdit="isEdit"
      :menuForm="menuForm"
      v-model:menuDrawerVisible="menuDrawerVisible"
    />
  </div>
</template>

<script setup>
import { onMounted, reactive, toRefs } from 'vue'
import Drawer from './components/Drawer.vue'
import { cloneDeep as _cloneDeep } from 'lodash-es'
import menuApi from '@/api/menu'
import { defaultLayoutRoute } from '@/router'
import { menuListSort } from '@/utils/index'

const defaultMenuForm = {
  type: 0,
  layout: defaultLayoutRoute.layout,
  hidden: false,
  alwaysShow: false,
  title: '',
  path: '',
  icon: 'menu',
  noCache: true,
  affix: false,
  breadcrumb: true,
  activeMenu: ''
}

const state = reactive({
  isEdit: false,
  menuDrawerVisible: false,
  menuForm: null,
  menuList: [],
  loading: false
})

const { isEdit, menuDrawerVisible, menuForm, menuList, loading } = toRefs(state)

const handleMenuCreate = () => {
  state.menuForm = _cloneDeep(defaultMenuForm)

  state.menuDrawerVisible = true

  state.isEdit = false
}

onMounted(async () => {
  try {
    state.loading = true

    const { menuList } = await menuApi.getMenuList()

    state.menuList = menuListSort(convertToTree(menuList))

    state.loading = false
  } catch (error) {
    state.loading = false

    console.log('🚀 ~ file: menu.vue:81 ~ onMounted ~ error:', error)
  }
})

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

const flattenTree = (tree, result = []) => {
  for (const node of tree) {
    const { children, ...rest } = node
    result.push(rest)
    if (children) {
      flattenTree(children, result)
    }
  }
  return result
}

const updateMenuSortIndex = (menuList) => {
  menuList.forEach((item, index) => {
    item.sortIndex = menuList.length - 1 - index

    if (item.children) {
      updateMenuSortIndex(item.children)
    }
  })
}

const handleUpdateTreeSort = async () => {
  updateMenuSortIndex(state.menuList)

  await menuApi.addMenuUpdateSort({ menuList: flattenTree(state.menuList) })
}
</script>

<style lang="scss" scoped>
.menu-container {
  margin: 20px;

  .tree-wrapper {
    margin-top: 20px;
    padding: 20px;
    background-color: #fff;

    .update-button {
      padding-top: 20px;
    }
  }
}
</style>
