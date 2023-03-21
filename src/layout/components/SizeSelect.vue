<template>
  <div @click="handleDropdownClick" class="size-select">
    <el-dropdown
      ref="refDropdown"
      trigger="contextmenu"
      @command="handleSetSize"
    >
      <svg-icon class="size" name="size" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="item of sizeOptions"
              :key="item.value"
              :disabled="size === item.value"
              :command="item.value"
            >
              {{ item.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { reactive, toRefs, computed } from 'vue'
import { useSettingsStore } from '@/store/settings'
import { ElMessage } from 'element-plus'

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

const handleSetSize = (size) => {
  settingsStore.changeSetting({
    key: 'size',
    value: size
  })
  ElMessage.success('Switch Size Success')
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
  transition: background 0.3s;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }

  .size {
    font-size: 18px;
    color: #5a5e66;
  }
}
</style>
