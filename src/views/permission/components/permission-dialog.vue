<template>
  <div class="permission-dialog">
    <el-dialog
      v-model="show"
      :title="dialogType === 'edit' ? 'Edit Role' : 'New Role'"
    >
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="80px"
        label-position="left"
        status-icon
      >
        <el-form-item label="Name" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="Desc" prop="description">
          <el-input v-model="ruleForm.description" type="textarea" />
        </el-form-item>
        <el-form-item label="Menus">
          <el-tree
            ref="treeRef"
            :data="routesData"
            :props="{ children: 'children', label: 'title' }"
            show-checkbox
            node-key="path"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="danger" @click="emits('update:dialogVisible', false)"
            >Cancel</el-button
          >
          <el-button type="primary" @click="confirmRole">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, reactive, toRefs, watch } from 'vue'
import path from 'path-browserify'
import { asyncRoutes } from '@/router/index'
import { cloneDeep as _cloneDeep } from 'lodash'

const emits = defineEmits(['update:dialogVisible'])
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false
  },
  dialogType: {
    type: String,
    default: 'new'
  },
  routesData: {
    type: Array,
    default: () => []
  },
  roleInfo: {
    type: Object,
    default: () => {}
  }
})

const state = reactive({
  ruleFormRef: null,
  ruleForm: {
    name: '',
    description: '',
    routes: []
  },
  rules: {
    name: [
      {
        required: true,
        message: 'Please input name',
        trigger: 'change'
      }
    ],
    description: [
      {
        required: true,
        message: 'Please input description',
        trigger: 'change'
      }
    ]
  },
  treeRef: null
})

const { ruleFormRef, ruleForm, rules, treeRef } = toRefs(state)

const show = computed({
  get: () => props.dialogVisible,
  set: (value) => emits('update:dialogVisible', value)
})

watch(
  () => props.dialogVisible,
  (value) => {
    // close this dialog, restet ruleFrom and tree
    if (value) {
      if (props.dialogType === 'edit') {
        state.ruleForm.name = _cloneDeep(props.roleInfo.name)
        state.ruleForm.description = _cloneDeep(props.roleInfo.description)
      }
    } else {
      state.treeRef.setCheckedNodes([])
      state.ruleFormRef.resetFields()
    }
  }
)

defineExpose({
  treeRef
})

const generateTree = (routes, basePath = '/', checkedKeys) => {
  const res = []

  for (const route of routes) {
    const routePath = path.resolve(basePath, route.path)

    // recursive child routes
    if (route.children) {
      route.children = generateTree(route.children, routePath, checkedKeys)
    }

    if (
      checkedKeys.includes(routePath) ||
      (route.children && route.children.length >= 1)
    ) {
      const { path, children, meta } = route
      const resItemInfo = {
        path,
        children,
        title: meta?.title
      }
      !children?.length && delete resItemInfo.children
      !meta?.title && delete resItemInfo.title
      res.push(resItemInfo)
    }
  }
  return res
}

const confirmRole = () => {
  state.ruleFormRef.validate((valid, fields) => {
    if (valid) {
      const isEdit = props.dialogType === 'edit'
      const checkedKeys = state.treeRef.getCheckedKeys()
      state.ruleForm.routes = generateTree(
        _cloneDeep(asyncRoutes),
        '/',
        checkedKeys
      )
      if (isEdit) {
        console.log('state.ruleForm', JSON.stringify(state.ruleForm.routes))
        // 编辑
      } else {
        console.log('state.ruleForm', JSON.stringify(state.ruleForm.routes))
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style lang="scss">
.permission-dialog {
  .el-form-item__label {
    font-weight: 700;
  }
}
</style>
