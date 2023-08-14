<template>
  <div class="menu-container">
    <el-button @click="handleMenuCreate">创建</el-button>
    <Drawer
      :isEdit="isEdit"
      :menuForm="menuForm"
      v-model:menuDrawerVisible="menuDrawerVisible"
    />
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import Drawer from './components/Drawer.vue'
import { cloneDeep as _cloneDeep } from 'lodash-es'

const defaultMenuForm = {
  type: 0,
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
  menuForm: null
})

const { isEdit, menuDrawerVisible, menuForm } = toRefs(state)

const handleMenuCreate = () => {
  state.menuForm = _cloneDeep(defaultMenuForm)

  state.menuDrawerVisible = true

  state.isEdit = false
}
</script>

<style lang="scss" scoped></style>
