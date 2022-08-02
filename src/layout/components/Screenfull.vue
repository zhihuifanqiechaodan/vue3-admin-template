<template>
    <div class="screen-full">
        <svg-icon class="fullscreen" :name="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" @click="click" />
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
    height: 100%;
    padding: 0 10px;
    transition: background .3s;
    cursor: pointer;


    &:hover {
        background: rgba(0, 0, 0, .025)
    }

    .fullscreen {
        font-size: 18px;
        color: #5a5e66;
    }
}
</style>