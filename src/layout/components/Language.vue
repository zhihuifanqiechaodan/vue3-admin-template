<template>
  <div @click="handleDropdownClick" class="locale-select">
    <el-dropdown ref="refDropdown" @command="handleSetSize">
      <svg-icon class="i18n" name="i18n" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="item of localeOptions"
              :key="item"
              :disabled="locale === item"
              :command="item"
            >
              {{ item }}
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
import { useI18n } from 'vue-i18n'
import { messages } from '@/locales/index'

const i18n = useI18n()

const state = reactive({
  localeOptions: Object.keys(messages),
  refDropdown: null
})
const { localeOptions, refDropdown } = toRefs(state)

const settingsStore = useSettingsStore()
const locale = computed(() => settingsStore.locale)

const handleSetSize = (locale) => {
  i18n.locale.value = locale

  settingsStore.changeSetting({
    key: 'locale',
    value: locale
  })

  ElMessage.success('Switch locale Success')
}

const handleDropdownClick = () => {
  state.refDropdown.handleOpen()
}
</script>

<style lang="scss" scoped>
.locale-select {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  transition: background 0.3s;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }

  .i18n {
    font-size: 18px;
    color: #5a5e66;
  }
}
</style>
