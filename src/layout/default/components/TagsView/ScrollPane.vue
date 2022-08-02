<template>
    <el-scrollbar ref="refScrollContainer" :vertical="false" class="scroll-container"
        @wheel.native.prevent="handleScroll">
        <slot></slot>
    </el-scrollbar>
</template>
    
<script setup>
import { onBeforeUnmount, onMounted, reactive, toRefs, } from 'vue';

const emits = defineEmits(['scroll'])

const props = defineProps({
    refTag: {}
})

const tagAndTagSpacing = 4 // tagAndTagSpacing

const state = reactive({
    left: 0,
    refScrollContainer: null
})

const { left, refScrollContainer } = toRefs(state)

const handleScroll = (e) => {
    const eventDelta = e.wheelDelta || -e.deltaY * 40
    refScrollContainer.value.wrap$.scrollLeft = refScrollContainer.value.wrap$.scrollLeft + eventDelta / 4
}

const emitScroll = () => {
    emits('scroll')
}

const moveToTarget = (currentTag) => {
    const $containerWidth = refScrollContainer.value.wrap$.offsetWidth
    const $scrollWrapper = refScrollContainer.value.wrap$
    const tagList = props.refTag

    let firstTag = null
    let lastTag = null

    // find first tag and last tag
    if (tagList.length > 0) {
        firstTag = tagList[0]
        lastTag = tagList[tagList.length - 1]
    }

    if (firstTag === currentTag) {
        $scrollWrapper.scrollLeft = 0
    } else if (lastTag === currentTag) {
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
    } else {
        // find preTag and nextTag
        const currentIndex = tagList.findIndex(item => item === currentTag)
        const prevTag = tagList[currentIndex - 1]
        const nextTag = tagList[currentIndex + 1]

        // the tag's offsetLeft after of nextTag
        const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing

        // the tag's offsetLeft before of prevTag
        const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing

        if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
            $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
        } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
            $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
        }
    }
}

onMounted(() => {
    refScrollContainer.value.wrap$.addEventListener('scroll', emitScroll, true)
})

onBeforeUnmount(() => {
    refScrollContainer.value.wrap$.removeEventListener('scroll', emitScroll)

})

defineExpose({
    moveToTarget
})
</script>


<style lang="scss">
.scroll-container {
    .el-scrollbar__view {
        display: flex;
        align-items: center;
        height: 100%;
    }
}
</style>