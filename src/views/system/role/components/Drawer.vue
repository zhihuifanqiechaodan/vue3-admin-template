<template>
  <div class="drawer-wrapper">
    <el-drawer v-model="drawerVisible" :title="title">
      <el-form
        ref="menuFormRef"
        :model="ruleFormComputed"
        :rules="FormRules"
        label-width="120px"
      >
        <el-form-item label="name" prop="name">
          <el-input
            v-model="ruleFormComputed.name"
            placeholder="Please input name"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="ruleFormComputed.status">
            <el-radio
              v-for="item in statusTypeList"
              :key="item.label"
              :label="item.label"
              border
              >{{ item.name }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="权限" prop="menuIds">
          <el-tree
            ref="menuTreeRef"
            :data="props.menuList"
            show-checkbox
            node-key="id"
            default-expand-all
            :default-checked-keys="ruleFormComputed.menuIds"
            :props="{ children: 'children', label: 'title' }"
            @check-change="handleTreeCheckChange"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="emits('update:drawerVisible', false)"
            >取消</el-button
          >
          <el-button
            :loading="state.loading"
            type="primary"
            @click="submitForm(menuFormRef)"
          >
            {{ buttonText }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { addSystemRoleAddRole, addSystemRoleUpdateRole } from '@/api/system'
import { cloneDeep as _cloneDeep, pick as _pick } from 'lodash-es'

const statusTypeList = [
  { label: 0, name: '启用' },
  { label: 1, name: '禁用' }
]

const validatorMenuIds = (rule, value, callback) => {
  const menuIds = menuTreeRef.value.getCheckedKeys()

  if (!menuIds?.length) {
    callback(new Error('Please check the menuid again'))
  } else {
    callback()
  }
}

const FormRules = {
  name: [{ required: true, message: 'Please input  name', trigger: 'blur' }],
  menuIds: [
    {
      validator: validatorMenuIds,
      trigger: 'change'
    }
  ]
}

const props = defineProps([
  'drawerVisible',
  'drawerMode',
  'menuList',
  'ruleInfo'
])

const emits = defineEmits([
  'update:drawerVisible',
  'update:ruleInfo',
  'initData'
])

const menuFormRef = ref(null)

const menuTreeRef = ref(null)

const state = reactive({
  loading: false
})

const ruleFormComputed = computed({
  get: () => props.ruleInfo,
  set: (value) => emits('update:ruleInfo', value)
})

const drawerVisible = computed({
  get() {
    return props.drawerVisible
  },
  set(value) {
    emits('update:drawerVisible', value)
  }
})

const title = computed(() => {
  return { create: '创建', edit: '编辑' }[props.drawerMode]
})

const buttonText = computed(() => {
  return { create: '确定', edit: '更新' }[props.drawerMode]
})

const handleTreeCheckChange = () => {
  const ruleInfo = _cloneDeep(props.ruleInfo)

  ruleInfo.menuIds = menuTreeRef.value.getCheckedKeys()

  emits('update:ruleInfo', ruleInfo)
}

const submitForm = async (menuFormRef) => {
  if (!menuFormRef) return

  menuFormRef.validate(async (valid, fields) => {
    if (valid) {
      state.loading = true

      let filed

      try {
        if (props.drawerMode === 'edit') {
          filed = ['menuIds', 'name', 'status']

          await addSystemRoleUpdateRole({
            ..._pick(props.ruleInfo, filed),
            roleId: props.ruleInfo.id
          })
        } else if (props.drawerMode === 'create') {
          filed = ['menuIds', 'name', 'status']

          await addSystemRoleAddRole(_pick(props.ruleInfo, filed))
        }

        emits('update:drawerVisible', false)

        emits('initData')
      } catch (error) {
        console.log(
          '🚀 ~ file: Drawer.vue:303 ~ menuFormRef.validate ~ error:',
          error
        )
      }

      state.loading = false
    } else {
      console.log(
        '🚀 ~ file: Drawer.vue:278 ~ menuFormRef.validate ~ fields:',
        fields
      )
    }
  })
}

const treeSetCheckedKeys = (data) => {
  menuTreeRef.value.setCheckedKeys(data)
}

defineExpose({
  treeSetCheckedKeys
})
</script>

<style lang="scss" scoped>
.drawer-wrapper {
  .page-button-permissions {
    .el-tag {
      margin-right: 5px;
    }
  }
}
</style>
