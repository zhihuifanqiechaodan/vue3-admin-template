<template>
  <div @click="click" class="screen-full">
    <svg-icon
      class="fullscreen"
      :name="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
    />
  </div>
</template>

<script setup>
import { reactive, toRefs, onBeforeUnmount } from 'vue'
import screenfull from 'screenfull'
import { ElMessage } from 'element-plus'

const state = reactive({
  isFullscreen: false
})

const { isFullscreen } = toRefs(state)

const click = () => {
  if (!screenfull.isEnabled) {
    ElMessage.warning('you browser can not work')
    return false
  }
  screenfull.toggle()
}

const change = () => {
  state.isFullscreen = screenfull.isFullscreen
}

const init = () => {
  if (screenfull.isEnabled) {
    screenfull.on('change', change)
  }
}

const destroy = () => {
  if (screenfull.isEnabled) {
    screenfull.off('change', change)
  }
}

init()

onBeforeUnmount(() => {
  destroy()
})
</script>

<style lang="scss" scoped>
.screen-full {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  transition: background 0.3s;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }

  .fullscreen {
    font-size: 18px;
    color: #5a5e66;
  }
}
</style>
