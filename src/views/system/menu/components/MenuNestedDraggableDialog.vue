<template>
  <el-dialog
    v-model="dialogVisible"
    title="拖拽排序"
    fullscreen
    class="menuNestedDraggableDialog"
  >
    <MenuNestedDraggable :list="props.menuList" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emits('update:dialogVisible', false)"
          >Cancel</el-button
        >
        <el-button type="primary" @click="emits('handleUpdateTreeSort')">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed } from 'vue'
import MenuNestedDraggable from './MenuNestedDraggable.vue'

const props = defineProps(['dialogVisible', 'menuList'])

const emits = defineEmits(['update:dialogVisible', 'handleUpdateTreeSort'])

const dialogVisible = computed({
  get: () => props.dialogVisible,
  set: (value) => emits('update:dialogVisible', value)
})
</script>

<style lang="scss">
.menuNestedDraggableDialog {
  display: flex;
  flex-direction: column;

  .el-dialog__body {
    flex: 1;
    overflow-y: scroll;
  }
}
</style>
