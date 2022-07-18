<template>
    <div ref="refRightPanel" :class="{ show: show }" class="rightPanel-container">
        <div class="rightPanel-background" />
        <div class="rightPanel">
            <div class="handle-button"
                :style="{ 'top': buttonTop + 'px', 'background-color': elementVariablesJson.theme }"
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
import elementVariables from '@/styles/element-variables.scss'
import { addClass, removeClass } from '@/utils/index'

const props = defineProps({
    clickNotClose: {
        default: false,
        type: Boolean
    },
    buttonTop: {
        default: 250,
        type: Number
    }
})

const state = reactive({
    show: false,
    refRightPanel: null
})

const { show, refRightPanel } = toRefs(state)

//change  scss variable to js
//导出scss定义的样式变量
//vite无法获取scss变量https://github.com/vitejs/vite/issues/1279
const dillScssExportToJson = (scssExportJson) => {
    const jsonString = scssExportJson.replace(/:export\s*/, '').replace(/[\s+\r\n]/g, '')
    const scssJson = {}
    jsonString
        .slice(1, jsonString.length - 2)
        .split(';')
        .forEach((fItem) => {
            const arr = fItem.split(':')
            scssJson[arr[0]] = arr[1]
        })
    return scssJson
}
const elementVariablesJson = dillScssExportToJson(elementVariables)
console.log(elementVariablesJson);

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
    width: calc(100% - 15px);
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
    width: 48px;
    height: 48px;
    position: absolute;
    left: -48px;
    text-align: center;
    font-size: 24px;
    border-radius: 6px 0 0 6px !important;
    z-index: 0;
    pointer-events: auto;
    cursor: pointer;
    color: #fff;
    line-height: 48px;

    i {
        font-size: 24px;
        line-height: 48px;
    }
}
</style>