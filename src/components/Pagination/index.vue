<template>
  <el-pagination
    v-if="props.total > 0"
    v-model:page-size="pageSize"
    v-model:current-page="currentPage"
    :hide-on-single-page="hideOnSinglePage"
    :background="props.background"
    :layout="props.layout"
    :total="props.total"
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
  page: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 20
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  }
})

const emits = defineEmits(['pagination', 'update:page', 'update:limit'])

const currentPage = computed({
  get() {
    return props.page
  },
  set(val) {
    console.log(val)
    emits('update:page', val)
  }
})

const pageSize = computed({
  get() {
    return props.limit
  },
  set(val) {
    emits('update:limit', val)
  }
})

const hideOnSinglePage = computed(() => {
  return props.total / props.limit > 1
})

const handleSizeChange = (limit) => {
  emits('pagination', { page: props.currentPage, limit })
}
const handleCurrentChange = (page) => {
  emits('pagination', { page, limit: props.limit })
}
</script>

<style lang="scss"></style>
