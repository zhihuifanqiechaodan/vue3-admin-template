<template>
  <el-breadcrumb separator="/" class="breadcrumb-container">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
          >{{ item.meta.title }}</span
        >
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { compile } from 'path-to-regexp'
import { watch, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const state = reactive({
  levelList: null
})

const { levelList } = toRefs(state)

const router = useRouter()

const route = useRoute()

const isDashboard = (route) => {
  const name = route && route.name
  if (!name) {
    return false
  }
  return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
}

const getBreadcrumb = () => {
  // only show routes with meta.title
  let matched = route.matched.filter((item) => item.meta && item.meta.title)
  const first = matched[0]

  if (!isDashboard(first)) {
    matched = [{ path: '/dashboard', meta: { title: 'Dashboard' } }].concat(
      matched
    )
  }

  state.levelList = matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  )
}

const pathCompile = (path) => {
  // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
  const { params } = route
  var toPath = compile(path)
  return toPath(params)
}

const handleLink = (item) => {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect)
    return
  }
  router.push(pathCompile(path))
}

getBreadcrumb()

watch(
  () => route.path,
  () => {
    getBreadcrumb()
  }
)
</script>

<style lang="scss" scoped>
.breadcrumb-container {
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 10px;
  white-space: nowrap;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }

  a {
    font-weight: normal;
  }
}
</style>
