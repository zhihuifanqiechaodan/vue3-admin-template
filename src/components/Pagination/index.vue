<template>
  <el-pagination
    v-model:page-size="pageSize"
    v-model:current-page="currentPage"
    :total="props.total"
    :page-sizes="props.pageSizes"
    :layout="props.layout"
    :background="props.background"
    :hide-on-single-page="props.hideOnSinglePage"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  total: {
    required: true,
    type: Number
  },
  background: {
    type: Boolean,
    default: true
  },
  pageSizes: {
    type: Array,
    default() {
      return [10, 20, 30, 50]
    }
  },
  pageSize: {
    type: Number,
    default: 1
  },
  currentPage: {
    type: Number,
    default: 20
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  },
  hideOnSinglePage: {
    type: Boolean,
    default: true
  }
})

const emits = defineEmits([
  'pagination',
  'update:currentPage',
  'update:pageSize'
])

const currentPage = computed({
  get() {
    return props.currentPage
  },
  set(value) {
    emits('update:currentPage', value)
  }
})

const pageSize = computed({
  get() {
    return props.pageSize
  },
  set(value) {
    emits('update:pageSize', value)
  }
})

const handleSizeChange = (pageSize) => {
  emits('pagination', { currentPage: props.currentPage, pageSize })
}
const handleCurrentChange = (currentPage) => {
  emits('pagination', { currentPage, pageSize: props.pageSize })
}
</script>

<style lang="scss"></style>
