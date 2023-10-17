<template>
  <el-drawer v-model="drawerVisible" :title="title">
    <el-form
      ref="formRef"
      :model="userFormComputed"
      :rules="formRules"
      label-width="120px"
    >
      <el-form-item label="账号" prop="username">
        <el-input
          :disabled="props.drawerMode === 'edit'"
          v-model="userFormComputed.username"
          placeholder="Please input username"
        />
      </el-form-item>
      <el-form-item
        :disabled="props.drawerMode === 'edit'"
        label="密码"
        prop="password"
      >
        <el-input
          v-model="userFormComputed.password"
          placeholder="Please input password"
        />
      </el-form-item>
      <el-form-item label="角色" prop="roleId">
        <el-select v-model="userFormComputed.roleId" placeholder="Select role">
          <el-option
            v-for="item in props.roleList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="userFormComputed.status">
          <el-radio
            v-for="item in statusTypeList"
            :key="item.label"
            :label="item.label"
            border
            >{{ item.name }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button @click="emits('update:menuDrawerVisible', false)"
          >取消</el-button
        >
        <el-button
          :loading="state.loading"
          type="primary"
          @click="submitForm(formRef)"
        >
          {{ buttonText }}
        </el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { addSystemUserAddUser, addSystemUserUpdateUser } from '@/api/system'
import { pick as _pick } from 'lodash-es'

const statusTypeList = [
  { label: 0, name: '启用' },
  { label: 1, name: '禁用' }
]

const formRules = {
  username: [
    { required: true, message: 'Please input  username', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please input  password', trigger: 'blur' }
  ],
  roleId: [
    {
      required: true,
      message: 'Please select role',
      trigger: 'change'
    }
  ]
}

const props = defineProps([
  'drawerVisible',
  'drawerMode',
  'userInfo',
  'roleList'
])

const emits = defineEmits([
  'update:drawerVisible',
  'update:userInfo',
  'initData'
])

const formRef = ref(null)

const state = reactive({
  loading: false
})

const userFormComputed = computed({
  get: () => props.userInfo,
  set: (value) => emits('update:userInfo', value)
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

const submitForm = async (formRef) => {
  if (!formRef) return

  formRef.validate(async (valid, fields) => {
    if (valid) {
      console.log(props.userInfo)

      state.loading = true

      let field

      try {
        if (props.drawerMode === 'edit') {
          field = ['status', 'roleId']

          await addSystemUserUpdateUser({
            ..._pick(props.userInfo, field),
            userId: props.userInfo.id
          })
        } else if (props.drawerMode === 'create') {
          field = ['password', 'username', 'status', 'roleId']

          await addSystemUserAddUser(_pick(props.userInfo, field))
        }

        emits('update:drawerVisible', false)

        emits('initData')
      } catch (error) {
        console.log(
          '🚀 ~ file: Drawer.vue:303 ~ formRef.validate ~ error:',
          error
        )
      }

      state.loading = false

      emits('update:drawerVisible', false)

      emits('initData')
    } else {
      console.log(
        '🚀 ~ file: Drawer.vue:278 ~ formRef.validate ~ fields:',
        fields
      )
    }
  })
}
</script>

<style lang="scss" scoped></style>
