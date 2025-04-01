<template>
  <el-dialog
    v-model="visible"
    :title="props.title"
    :width="props.width"
    :draggable="props.draggable"
    class="custom-dialog"
  >
    <el-scrollbar>
      <slot />
    </el-scrollbar>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">{{
          props.cancelButtonText || $t('dialogCom.cancelButtonText')
        }}</el-button>
        <el-button @click="handleConfirm" type="primary">
          {{ props.confirmButtonText || $t('dialogCom.confirmButtonText') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: true
  },
  width: {
    type: String,
    default: '50%'
  },
  draggable: {
    type: Boolean,
    default: true
  },
  cancelButtonText: {
    type: String,
    default: ''
  },
  confirmButtonText: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['update:visible', 'handleConfirm'])

const visible = computed({
  get: () => props.visible,
  set: (value) => emits('update:visible', value)
})

const handleCancel = () => {
  emits('update:visible', false)
}

const handleConfirm = () => {
  emits('handleConfirm')
}
</script>

<style lang="scss">
.custom-dialog {
  .el-dialog__header {
    padding-bottom: 16px;
    border-bottom: 1px solid #f5f5f5;
  }
  .el-dialog__body {
    height: 60vh;
    padding-top: 0;
    padding-bottom: 0;
  }

  .el-dialog__footer {
    padding: 10px 20px;
    box-shadow:
      0px 12px 32px 4px rgba(0, 0, 0, 0.04),
      0px 8px 20px rgba(0, 0, 0, 0.08);
  }
}
</style>
