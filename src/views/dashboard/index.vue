<template>
  <div v-loading="loading" class="dashboard-container">
    <markdown-editor v-model:value="value" :options="options" />
  </div>
</template>

<script setup name="Dashboard">
import MarkdownEditor from '@/components/MarkdownEditor/index.vue'
import { onMounted, reactive, toRefs } from 'vue'
import giteeServices from '@/api/gitee'

const state = reactive({
  loading: false,
  value: '',
  options: {
    initialEditType: 'wysiwyg',
    height: '80vh'
  }
})

const { loading, value, options } = toRefs(state)
const initData = async () => {
  state.loading = true
  const response = await giteeServices.getVue3AdminTemplate()
  if (response) {
    state.value = response
  }
  state.loading = false
}
onMounted(() => {
  initData()
})
</script>

<style lang="scss">
.dashboard-container {
  margin: 0 20px;
  background-color: #fff;
  padding: 20px;
}
</style>
