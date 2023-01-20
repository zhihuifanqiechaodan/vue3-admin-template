<template>
  <template v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <Item
            v-if="onlyOneChild.meta.icon || item.meta"
            :icon="onlyOneChild.meta.icon || item.meta.icon"
          />
          <template #title>{{ onlyOneChild.meta?.title }}</template>
        </el-menu-item>
      </app-link>
    </template>

    <el-sub-menu v-else :index="resolvePath(item.path)">
      <template v-if="item.meta" #title>
        <Item :icon="item.meta.icon" />
        <span> {{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </el-sub-menu>
  </template>
</template>

<script setup>
import path from 'path-browserify'
import { isExternal } from '@/utils/validate'
import AppLink from './Link.vue'
import Item from './Item.vue'
import { reactive, toRefs } from 'vue'
const props = defineProps({
  //每一个router Item
  item: {
    type: Object,
    required: true
  },
  //基础路径，用于拼接
  basePath: {
    type: String,
    default: ''
  }
})

const state = reactive({
  onlyOneChild: null
})

const { onlyOneChild } = toRefs(state)

const hasOneShowingChild = (children = [], parent) => {
  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false
    } else {
      // Temp set(will be used if only has one showing child)
      state.onlyOneChild = item
      return true
    }
  })

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    state.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
    return true
  }

  return false
}

/**
 * @method resolvePath 处理路径
 * @param {*} routePath
 */
const resolvePath = (routePath) => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return path.resolve(props.basePath, routePath)
}
</script>
