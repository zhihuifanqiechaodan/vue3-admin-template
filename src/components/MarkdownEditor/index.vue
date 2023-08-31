<template>
  <div class="markdown-editor" :id="id"></div>
</template>

<script setup>
import '@toast-ui/editor/dist/toastui-editor.css'
import Editor from '@toast-ui/editor'
import { reactive, toRefs, onMounted, computed, watch, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'

const emits = defineEmits(['update:value'])
const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  options: {
    type: Object,
    default: () => {
      return {}
    }
  },
  language: {
    type: String,
    default: 'en-US'
  }
})

const state = reactive({
  id: `editor-${new Date().getTime() + (Math.random() * 1000).toFixed(0)}`,
  editor: null,
  options: {
    previewStyle: 'vertical',
    usageStatistics: false, // send hostname to google analytics
    autofocus: false // automatically focus the editor on creation.
  }
})

const { id } = toRefs(state)

const editorOptions = computed(() => {
  const options = Object.assign({}, state.options, props.options)
  options.language = props.language
  return options
})

const initEditor = () => {
  state.editor = new Editor({
    el: document.getElementById(state.id),
    initialValue: props.value,
    events: {
      change: () => {
        emits('update:value', state.editor.getMarkdown())
      }
    },
    ...editorOptions.value
  })
}

const destroyEditor = () => {
  state.editor.destroy()
}

const getMarkdown = () => {
  if (state.editor.isMarkdownMode()) {
    return state.editor.getMarkdown()
  } else {
    ElMessage.error('当前模式不支持获取Markdown')
  }
}

const getHTML = () => {
  if (state.editor.isWysiwygMode()) {
    return state.editor.getHTML()
  } else {
    ElMessage.error('当前模式不支持获取HTML')
  }
}

watch(
  () => props.language,
  () => {
    destroyEditor()
    initEditor()
  }
)

watch(
  () => props.value,
  (value) => {
    if (state.editor.getMarkdown() !== value) {
      destroyEditor()
      initEditor()
    }
  }
)

onMounted(() => {
  initEditor()
})

onUnmounted(() => {
  destroyEditor()
})

defineExpose({
  getMarkdown,
  getHTML
})
</script>

<style lang="scss"></style>
