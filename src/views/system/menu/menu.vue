<template>
  <div v-loading="loading" class="menu-container">
    <div class="header-wrapper">
      <div class="header-item">
        <el-button
          v-hasPermission="menu.permissionInfo.create.value"
          @click="handleMenuCreate"
          type="primary"
          >添加</el-button
        >
      </div>
      <div class="header-item">
        <el-checkbox v-model="sortEnabled" label="编辑排序" border />
      </div>
      <div class="header-item">
        <el-button
          :disabled="!sortEnabled"
          :loading="updateSortLoading"
          @click="handleUpdateTreeSort"
          type="primary"
          >更新排序
        </el-button>
      </div>
    </div>
    <div class="menu-nested-draggable">
      <MenuNestedDraggable :list="menuList" :enabled="sortEnabled" />
    </div>
    <Drawer
      :isEdit="isEdit"
      :menuForm="menuForm"
      :menuList="originalMenuList"
      v-model:menuDrawerVisible="menuDrawerVisible"
      @initData="initData"
    />
  </div>
</template>

<script setup>
import { onMounted, reactive, toRefs, provide } from 'vue'
import Drawer from './components/Drawer.vue'
import { cloneDeep as _cloneDeep } from 'lodash-es'
import {
  addSystemMenuGetAllMenuList,
  addSystemMenuMenuSort
} from '@/api/system'
import { defaultLayoutRoute } from '@/router'
import { menuListSort, convertToTree } from '@/utils/index'
import { ElMessageBox } from 'element-plus'
import MenuNestedDraggable from './components/MenuNestedDraggable.vue'
import { menu } from '@/router/modules/system'

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
  updateSortLoading: false,
  sortEnabled: false
})

const {
  isEdit,
  menuDrawerVisible,
  menuForm,
  menuList,
  loading,
  originalMenuList,
  updateSortLoading,
  sortEnabled
} = toRefs(state)

onMounted(() => {
  initData()
})

const initData = async () => {
  state.loading = true

  try {
    let menuList = await addSystemMenuGetAllMenuList()

    const menuOrCatalogueList = menuList.filter((item) => item.type !== 2)

    const buttonList = menuList.filter((item) => item.type === 2)

    menuOrCatalogueList.forEach((menuOrCatalogueListItem) => {
      if (menuOrCatalogueListItem.type === 1) {
        menuOrCatalogueListItem.permissions = buttonList
          .filter(
            (buttonListItem) =>
              buttonListItem.parentId === menuOrCatalogueListItem.id
          )
          .map((item) => item.buttonId)
      }
    })

    state.originalMenuList = menuOrCatalogueList

    state.menuList = menuListSort(convertToTree(menuOrCatalogueList))
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

const updateMenuSort = (menuList) => {
  menuList.forEach((item, index) => {
    item.sort = menuList.length - 1 - index

    if (item.children) {
      updateMenuSort(item.children)
    }
  })
}

const updateMenuParentId = () => {
  state.menuList = updateParentId(state.menuList)
}

provide('updateMenuParentId', updateMenuParentId)

const updateParentId = (data, parentId = 0) => {
  const updatedData = []

  for (const item of data) {
    const updatedItem = { ...item, parentId: parentId }

    if (item.children.length > 0) {
      updatedItem.children = updateParentId(item.children, item.id)
    }

    updatedData.push(updatedItem)
  }

  return updatedData
}

const handleUpdateTreeSort = async () => {
  ElMessageBox.confirm('更新排序后将刷新页面', 'Tips', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      state.updateSortLoading = true

      updateMenuSort(state.menuList)

      try {
        const menuList = flattenTree(state.menuList)
          .filter((item) => item.type !== 2)
          .map((item) => {
            return { menuId: item.id, parentId: item.parentId, sort: item.sort }
          })

        await addSystemMenuMenuSort({
          sortList: menuList
        })

        location.reload()
      } catch (error) {
        console.log('🚀 ~ file: menu.vue:192 ~ .then ~ error:', error)
      }

      state.updateSortLoading = false
    })
    .catch(() => {})
}

const handleMenuEdit = (data) => {
  state.isEdit = true

  state.menuForm = data

  state.menuDrawerVisible = true
}

provide('handleMenuEdit', handleMenuEdit)
</script>

<style lang="scss" scoped>
.menu-container {
  margin: 20px;
  padding: 20px;
  background-color: #fff;

  .header-wrapper {
    display: flex;
    align-items: center;
    padding-bottom: 20px;

    .header-item {
      margin-right: 20px;
    }
  }

  .menu-nested-draggable {
    padding: 20px 0;
  }
}
</style>
