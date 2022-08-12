<template>
    <div @click="handleDropdownClick" class="size-select">
        <el-dropdown ref="refDropdown" trigger="contextmenu" @command="handleSetSize">
            <svg-icon class="size" name="size" />
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-menu>
                        <el-dropdown-item v-for="item of sizeOptions" :key="item.value" :disabled="size === item.value"
                            :command="item.value">
                            {{
                                    item.label
                            }}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>
    
<script setup >
import { reactive, toRefs, computed, getCurrentInstance, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSettingsStore } from '@/store/settings'

const router = useRouter()
const route = useRoute()

const state = reactive({
    sizeOptions: [
        { label: 'Large', value: 'large' },
        { label: 'Default', value: 'default' },
        { label: 'Small', value: 'small' }
    ],
    refDropdown: null
})
const { sizeOptions, refDropdown } = toRefs(state)

const settingsStore = useSettingsStore()
const size = computed(() => settingsStore.size)


const instance = getCurrentInstance()
const handleSetSize = (size) => {
    const { $message, $ELEMENT_PLUS } = instance.appContext.app.config.globalProperties
    $ELEMENT_PLUS.size = size
    settingsStore.setSize(size)
    // refreshView()
    $message({
        message: 'Switch Size Success',
        type: 'success'
    })
    nextTick(() => {
        const { fullPath } = route
        router.replace({
            path: '/redirect' + fullPath
        })
    })
}

const handleDropdownClick = () => {
    state.refDropdown.handleOpen()
}
</script>
    
<style lang="scss" scoped>
.size-select {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 10px;
    transition: background .3s;
    cursor: pointer;

    &:hover {
        background: rgba(0, 0, 0, .025)
    }

    .size {
        font-size: 18px;
        color: #5a5e66;
    }
}
</style>