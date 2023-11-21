<template>
  <div class="dom-to-image-container">
    <aside ref="refDom">
      <a href="https://github.com/tsayen/dom-to-image" target="_blank"
        >dom-to-image</a
      >
      is a library which can turn arbitrary DOM node into a vector (SVG) or
      raster (PNG or JPEG) image, written in JavaScript. It's based on domvas by
      Paul Bakaus and has been completely rewritten, with some bugs fixed and
      some new features (like web font and image support) added.
    </aside>
    <el-button @click="handleDownloadJpeg" type="primary">下载 jpeg</el-button>
    <el-button @click="handleDownloadPng" type="primary">下载 Png</el-button>
  </div>
</template>

<script setup name="DomToImageIndex">
import useDomToImageHook from '@/hooks/useDomToImageHook'
import { reactive, toRefs } from 'vue'

const domToImageHook = useDomToImageHook()

const state = reactive({
  refDom: null
})

const { refDom } = toRefs(state)

const handleDownloadJpeg = () => {
  domToImageHook.toJpeg(refDom.value)
}
const handleDownloadPng = () => {
  domToImageHook.toPng(refDom.value)
}
</script>

<style lang="scss">
.dom-to-image-container {
  margin: 20px;
  padding: 20px;
  background-color: #fff;
  box-sizing: border-box;
}
</style>
