<template>
  <div class="clipboard-container">
    <aside>
      <a href="https://github.com/zenorocha/clipboard.js" target="_blank"
        >clipboard.js</a
      >
      A modern approach to copy text to clipboard No Flash. No frameworks. Just
      3kb gzipped
    </aside>
    <el-input
      v-model="context"
      :rows="10"
      type="textarea"
      placeholder="Please input"
    />
    <div class="copv-wrapper">
      <el-button
        @click="clipboardHook.handleClipboard($event, context)"
        type="success"
        >复制到剪切板</el-button
      >
    </div>
  </div>
</template>

<script setup name="ClipboardIndex">
import { reactive, toRefs } from 'vue'
import useClipboardHook from '@/hooks/useClipboardHook'

const clipboardHook = useClipboardHook()

const state = reactive({
  context:
    'Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis. Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo. Manduma pindureta quium dia nois paga.'
})

const { context } = toRefs(state)
</script>

<style lang="scss">
.clipboard-container {
  margin: 20px;
  padding: 20px;
  background-color: #fff;

  .copv-wrapper {
    padding-top: 20px;
  }
}
</style>
