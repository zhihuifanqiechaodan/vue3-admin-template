<template>
  <div class="markdown-container">
    <aside>
      The
      <a href="https://github.com/nhn/tui.editor" target="_blank">Editor</a>
      allows you to edit your Markdown documents using text or WYSIWYG and comes
      with Syntax Highlighting, Scroll-Sync, Live Preview, and Chart features.
    </aside>
    <div class="editor-wrapper">
      <el-tag class="tag-title"> Basic: </el-tag>
      <markdown-editor v-model:value="value" ref="refMarkdownEditor" />
    </div>
    <el-button @click="handleGetMarkdown" type="success">getMarkdown</el-button>
    <el-button @click="handleGetHtml" type="success">getHtml</el-button>
    <div class="editor-wrapper">
      <el-tag class="tag-title"> Markdown Mode: </el-tag>
      <markdown-editor
        v-model:value="value"
        :options="{ hideModeSwitch: true, previewStyle: 'tab' }"
      />
    </div>
    <div class="editor-wrapper">
      <el-tag class="tag-title"> Customize Toolbar: </el-tag>
      <markdown-editor
        v-model:value="value"
        :options="{ toolbarItems: [['heading', 'bold', 'italic']] }"
      />
    </div>
  </div>
</template>

<script setup name="MarkdownIndex">
import MarkdownEditor from '@/components/MarkdownEditor/index.vue'
import { reactive, toRefs } from 'vue'

const state = reactive({
  value: `**This is test**
* vue
* element
* vite`,
  refMarkdownEditor: null
})

const { value, refMarkdownEditor } = toRefs(state)

const handleGetHtml = () => {
  const html = state.refMarkdownEditor.getHTML()
  console.log(html)
}
const handleGetMarkdown = () => {
  const markdown = state.refMarkdownEditor.getMarkdown()
  console.log(markdown)
}
</script>

<style lang="scss">
.markdown-container {
  margin: 20px;
  background-color: #fff;
  padding: 20px;

  .editor-wrapper {
    padding: 20px 0;

    .tag-title {
      margin-bottom: 10px;
    }
  }
}
</style>
