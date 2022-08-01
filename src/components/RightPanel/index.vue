<template>
    <div ref="refRightPanel" :class="{ show: show }" class="rightPanel-container">
        <div class="rightPanel-background" />
        <div class="rightPanel">
            <div class="handle-button" :style="{ 'top': buttonTop + 'px', 'background-color': buttonBackgroundColor }"
                @click="show = !show">
                <svg-icon :name="show ? 'close' : 'setting'" />
            </div>
            <div class="rightPanel-items">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, reactive, toRefs, watch } from 'vue';
import { addClass, removeClass } from '@/utils/index'

const props = defineProps({
    clickNotClose: {
        default: false,
        type: Boolean
    },
    buttonTop: {
        default: 250,
        type: Number
    },
    buttonBackgroundColor: {
        default: '#1890ff',
        type: String
    }
})

const state = reactive({
    show: false,
    refRightPanel: null
})

const { show, refRightPanel } = toRefs(state)

const addEventClick = () => {
    window.addEventListener('click', closeSidebar)
}

const closeSidebar = (evt) => {
    const parent = evt.target.closest('.rightPanel')
    if (!parent) {
        state.show = false
        window.removeEventListener('click', closeSidebar)
    }
}
const insertToBody = () => {
    const elx = refRightPanel.value
    const body = document.querySelector('body')
    body.insertBefore(elx, body.firstChild)
}

watch(() => state.show, (newValue) => {
    if (newValue && !props.clickNotClose) {
        addEventClick()
    }
    if (newValue) {
        addClass(document.body, 'showRightPanel')
    } else {
        removeClass(document.body, 'showRightPanel')
    }
})

onMounted(() => {
    insertToBody()
})

onBeforeUnmount(() => {
    refRightPanel.value.remove()
})

</script>

<style>
.showRightPanel {
    overflow: hidden;
    position: relative;
    /* width: calc(100% - 15px); */
}
</style>

<style lang="scss" scoped>
.rightPanel-background {
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity .3s cubic-bezier(.7, .3, .1, 1);
    background: rgba(0, 0, 0, .2);
    z-index: -1;
}

.rightPanel {
    width: 100%;
    max-width: 260px;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, .05);
    transition: all .25s cubic-bezier(.7, .3, .1, 1);
    transform: translate(100%);
    background: #fff;
    z-index: 40000;
}

.show {
    transition: all .3s cubic-bezier(.7, .3, .1, 1);

    .rightPanel-background {
        z-index: 20000;
        opacity: 1;
        width: 100%;
        height: 100%;
    }

    .rightPanel {
        transform: translate(0);
    }
}

.handle-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    position: absolute;
    left: -48px;
    font-size: 24px;
    border-radius: 6px 0 0 6px !important;
    z-index: 0;
    pointer-events: auto;
    cursor: pointer;
    color: #fff;
    line-height: 48px;
}
</style>