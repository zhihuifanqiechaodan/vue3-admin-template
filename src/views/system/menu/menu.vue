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
        <el-button
          v-hasPermission="menu.permissionInfo.sort.value"
          @click="dialogVisible = true"
          type="primary"
          >排序</el-button
        >
      </div>
    </div>
    <div class="table-wrapper">
      <MenuTable @handleMenuEdit="handleMenuEdit" :tableData="menuList" />
    </div>
    <MenuDialog
      :isEdit="isEdit"
      :menuForm="menuForm"
      :menuList="originalMenuList"
      v-model:menuDrawerVisible="menuDrawerVisible"
      @initData="initData"
    />
    <MenuNestedDraggableDialog
      @handleUpdateTreeSort="handleUpdateTreeSort"
      v-model:dialogVisible="dialogVisible"
      :menuList="menuList"
    />
  </div>
</template>

<script setup>
import { onMounted, reactive, toRefs, provide } from 'vue'
import { cloneDeep as _cloneDeep } from 'lodash-es'
import {
  addSystemMenuGetAllMenuList,
  addSystemMenuMenuSort
} from '@/api/system'
import { defaultLayoutRoute } from '@/router'
import { menuListSort, convertToTree } from '@/utils/index'
import { ElMessageBox } from 'element-plus'
import { menu } from '@/router/modules/system'
import MenuNestedDraggableDialog from './components/MenuNestedDraggableDialog.vue'
import MenuTable from './components/MenuTable.vue'
import MenuDialog from './components/MenuDialog.vue'

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
  dialogVisible: false
})

const {
  isEdit,
  menuDrawerVisible,
  menuForm,
  menuList,
  loading,
  originalMenuList,
  dialogVisible
} = toRefs(state)

onMounted(() => {
  initData()
})

const initData = async () => {
  state.loading = true

  try {
    let menuList = await addSystemMenuGetAllMenuList()

    // const menuOrCatalogueList = menuList.filter((item) => item.type !== 2)

    // const buttonList = menuList.filter((item) => item.type === 2)

    // menuOrCatalogueList.forEach((menuOrCatalogueListItem) => {
    //   if (menuOrCatalogueListItem.type === 1) {
    //     menuOrCatalogueListItem.permissions = buttonList
    //       .filter(
    //         (buttonListItem) =>
    //           buttonListItem.parentId === menuOrCatalogueListItem.id
    //       )
    //       .map((item) => item.buttonId)
    //   }
    // })

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
      state.dialogVisible = false

      state.loading = true

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

      state.loading = false
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
  margin-top: 0;
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

<style lang="scss">
.table-wrapper {
  .el-table__expand-icon {
    vertical-align: middle;
  }
  .title {
    padding-left: 5px;
    vertical-align: middle;
  }

  .icon {
    vertical-align: middle;
  }
}
</style>
