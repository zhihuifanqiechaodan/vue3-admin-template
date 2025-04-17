<template>
  <el-tree
    ref="treeRef"
    :data="treeData"
    show-checkbox
    node-key="id"
    default-expand-all
    :default-checked-keys="defaultCheckedKeys"
    :props="{ children: 'children', label: 'label' }"
  />
</template>

<script setup>
import { ref, computed } from 'vue'
import { asyncRoutes } from '@/router/index'

defineProps({
  defaultCheckedKeys: {
    type: Array,
    default: () => []
  }
})

const treeRef = ref(null)

const treeData = computed(() => transformRoutesToTree(asyncRoutes))
/**
 * 将路由数组转换为树形结构
 * @param {Array} routes 路由数组
 * @returns {Array} 树形结构
 */
const transformRoutesToTree = (routes) => {
  return routes.map((route) => {
    const node = {
      id: route.meta?.pageId,
      label: route.meta?.title,
      children: []
    }

    // 处理按钮权限
    if (route.meta?.buttonIds) {
      node.children = route.meta.buttonIds.map((button) => ({
        id: button.buttonId,
        label: button.buttonText
      }))
    }

    // 递归处理子路由
    if (route.children) {
      node.children = [
        ...node.children,
        ...transformRoutesToTree(route.children)
      ]
    }

    return node
  })
}

// 暴露方法给父组件
defineExpose({
  getCheckedKeys: () => treeRef.value?.getCheckedKeys()
})
</script>
