<template>
    <div class="screen-full">
        <svg-icon :name="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" @click="click" />
    </div>
</template>
    
<script setup >
import { reactive, toRefs, onBeforeUnmount } from 'vue'
import screenfull from 'screenfull'

const state = reactive({
    isFullscreen: false
})

const { isFullscreen } = toRefs(state)

const click = () => {
    if (!screenfull.isEnabled) {
        this.$message({
            message: 'you browser can not work',
            type: 'warning'
        })
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
}
</style>