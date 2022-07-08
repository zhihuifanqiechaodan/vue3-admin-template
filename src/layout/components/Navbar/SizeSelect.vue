<template>
    <el-dropdown trigger="click" @command="handleSetSize">
        <div>
            <svg-icon class-name="size-icon" name="size" />
        </div>
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
    ]
})
const { sizeOptions } = toRefs(state)

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
</script>
    
<style>
</style>