<template>
  <el-drawer v-model="drawerVisible" :title="drawerTitle">
    <el-form
      ref="menuFormRef"
      :model="menuFormComputed"
      :rules="menuFormRules"
      label-width="120px"
    >
      <el-space fill>
        <el-alert type="info" show-icon :closable="false">
          <p>
            当类型为目录且只有一个菜单的时候，如果没有设置总是显示目录，那么将只显示菜单，不会显示目录
          </p>
        </el-alert>
        <el-form-item label="类型">
          <el-radio-group v-model="menuFormComputed.type">
            <el-radio
              v-for="item in menuTypeList"
              :key="item.label"
              :label="item.label"
              border
              >{{ item.name }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
      </el-space>
      <el-space v-if="menuFormComputed.type === 0" fill>
        <el-alert type="info" show-icon :closable="false">
          <p>当设置为显示时，当前目录下只有一个菜单，那么将显示目录</p>
        </el-alert>
        <el-form-item label="总是显示目录">
          <el-radio-group v-model="menuFormComputed.alwaysShow">
            <el-radio
              v-for="item in menuAlwaysShowTypeList"
              :key="item.label"
              :label="item.label"
              border
              >{{ item.name }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
      </el-space>
      <el-space fill>
        <el-alert type="info" show-icon :closable="false">
          <p>当设置为隐藏时，将不显示当前菜单或目录</p>
        </el-alert>
        <el-form-item label="隐藏">
          <el-radio-group v-model="menuFormComputed.hidden">
            <el-radio
              v-for="item in menuHiddenTypeList"
              :key="item.label"
              :label="item.label"
              border
              >{{ item.name }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
      </el-space>
      <el-space fill>
        <el-alert type="info" show-icon :closable="false">
          <p>当设置为缓存时，将缓存当前页面</p>
        </el-alert>
        <el-form-item label="缓存">
          <el-radio-group v-model="menuFormComputed.noCache">
            <el-radio
              v-for="item in noCacheTypeList"
              :key="item.label"
              :label="item.label"
              border
              >{{ item.name }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
      </el-space>
      <el-space fill>
        <el-alert type="info" show-icon :closable="false">
          <p>当设置为隐藏时，将不会出现在面包屑中【仅在经典布局中】</p>
        </el-alert>
        <el-form-item label="面包屑展示">
          <el-radio-group v-model="menuFormComputed.breadcrumb">
            <el-radio
              v-for="item in breadcrumbTypeList"
              :key="item.label"
              :label="item.label"
              border
              >{{ item.name }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
      </el-space>
      <el-form-item label="名称" prop="title">
        <el-input
          v-model="menuFormComputed.title"
          placeholder="Please input title"
        />
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-select
          v-model="menuFormComputed.icon"
          filterable
          placeholder="Select menu icon"
        >
          <el-option v-for="item in iconList" :key="item" :value="item">
            <span>{{ item }}</span>
            <SvgIcon :name="item" />
          </el-option>
        </el-select>
        <SvgIcon :name="menuFormComputed.icon" />
      </el-form-item>
      <el-form-item v-if="menuFormComputed.type === 1" label="路径" prop="path">
        <el-select
          v-model="menuFormComputed.path"
          filterable
          placeholder="Select menu path"
        >
          <el-option
            v-for="item in asyncRoutes"
            :key="item.path"
            :label="item.path"
            :value="item.path"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Create
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup>
import { computed, ref } from 'vue'
import svgIds from 'virtual:svg-icons-names'
import { asyncRoutes } from '@/router/index'

const menuFormRules = {
  title: [{ required: true, message: 'Please input  title', trigger: 'blur' }],
  path: [
    { required: true, message: 'Please change menu path', trigger: 'change' }
  ]
}

const menuTypeList = [
  { label: 0, name: '目录' },
  { label: 1, name: '菜单' }
]

const menuHiddenTypeList = [
  { label: false, name: '显示' },
  { label: true, name: '隐藏' }
]

const menuAlwaysShowTypeList = [
  { label: true, name: '显示' },
  { label: false, name: '隐藏' }
]

const noCacheTypeList = [
  { label: true, name: '不缓存' },
  { label: false, name: '缓存' }
]

const breadcrumbTypeList = [
  { label: true, name: '显示' },
  { label: false, name: '隐藏' }
]

const props = defineProps(['isEdit', 'menuForm', 'menuDrawerVisible'])

const emits = defineEmits(['update:menuDrawerVisible', 'update:menuForm'])

const menuFormRef = ref(null)

const drawerVisible = computed({
  get: () => props.menuDrawerVisible,
  set: (value) => emits('update:menuDrawerVisible', value)
})

const drawerTitle = computed(() => (props.isEdit ? '编辑菜单' : '添加菜单'))

const iconList = computed(() => svgIds.map((item) => item.replace('icon-', '')))

const menuFormComputed = computed({
  get: () => props.menuForm,
  set: (value) => emits('update:menuForm', value)
})
</script>

<style lang="scss" scoped></style>
