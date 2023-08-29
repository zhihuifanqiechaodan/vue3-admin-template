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
        <el-form-item label="type">
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
          <p>用于展示当前菜单的布局模式</p>
        </el-alert>
        <el-form-item label="layout">
          <el-select
            v-model="menuFormComputed.layout"
            filterable
            placeholder="Select layout"
          >
            <el-option
              v-for="item in layoutRoutes"
              :key="item.layout"
              :label="item.layout"
              :value="item.layout"
            />
          </el-select>
        </el-form-item>
      </el-space>
      <el-space fill>
        <el-alert type="info" show-icon :closable="false">
          <p>
            当设置 true 的时候该路由不会在侧边栏出现
            如401，login等页面，或者如一些编辑页面/edit/1
          </p>
        </el-alert>
        <el-form-item label="hidden">
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
      <el-space v-if="menuFormComputed.type === 0" fill>
        <el-alert type="info" show-icon :closable="false">
          <p>
            当你一个路由下面的 children
            声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
          </p>
          <p>只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面</p>
          <p>若你想不管路由下面的 children 声明的个数都显示你的根路由</p>
          <p>
            你可以设置 alwaysShow:
            true，这样它就会忽略之前定义的规则，一直显示根路由
          </p>
        </el-alert>
        <el-form-item label="alwaysShow">
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
      <el-form-item label="title" prop="title">
        <el-input
          v-model="menuFormComputed.title"
          placeholder="Please input title"
        />
      </el-form-item>
      <el-form-item v-if="menuFormComputed.type === 1" label="path" prop="path">
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
      <el-form-item label="icon" prop="icon">
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
      <el-space v-if="menuFormComputed.type === 1" fill>
        <el-alert type="info" show-icon :closable="false">
          <p>如果设置为true，则不会被 keep-alive 缓存(默认 true)</p>
        </el-alert>
        <el-form-item label="noCache">
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
      <el-space v-if="menuFormComputed.type === 1" fill>
        <el-alert type="info" show-icon :closable="false">
          <p>
            如果设置为true，它则会固定在tags-view中(默认 false,
            只在经典布局中展示)
          </p>
        </el-alert>
        <el-form-item label="affix">
          <el-radio-group v-model="menuFormComputed.affix">
            <el-radio
              v-for="item in affixTypeList"
              :key="item.label"
              :label="item.label"
              border
              >{{ item.name }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
      </el-space>
      <el-space v-if="menuFormComputed.type === 1" fill>
        <el-alert type="info" show-icon :closable="false">
          <p>
            如果设置为false，则不会在breadcrumb面包屑中显示(默认
            true，只在经典布局中展示)
          </p>
        </el-alert>
        <el-form-item label="breadcrumb">
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
      <el-space v-if="menuFormComputed.type === 1" fill>
        <el-alert type="info" show-icon :closable="false">
          <p>当路由设置了该属性，则会高亮相对应的侧边栏。</p>
          <p>
            这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
          </p>
          <p>
            点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
          </p>
          <p>如果设置了path，侧边栏会高亮显示你设置的路径</p>
        </el-alert>
        <el-form-item v-if="menuFormComputed.type === 1" label="activeMenu">
          <el-input
            v-model="menuFormComputed.activeMenu"
            placeholder="Please input activeMenu"
          />
        </el-form-item>
      </el-space>
      <el-form-item>
        <el-button @click="emits('update:menuDrawerVisible', false)"
          >取消</el-button
        >
        <el-button type="primary" @click="submitForm(menuFormRef)">
          确认
        </el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup>
import { computed, ref } from 'vue'
import svgIds from 'virtual:svg-icons-names'
import { asyncRoutes, layoutRoutes } from '@/router/index'
import menuApi from '@/api/menu'

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

const affixTypeList = [
  { label: true, name: '固定' },
  { label: false, name: '不固定' }
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

const submitForm = async (menuFormRef) => {
  if (!menuFormRef) return

  menuFormRef.validate(async (valid, fields) => {
    if (valid) {
      await menuApi.addMenuCreate(props.menuForm)
    } else {
      console.log(
        '🚀 ~ file: Drawer.vue:278 ~ menuFormRef.validate ~ fields:',
        fields
      )
    }
  })
}
</script>

<style lang="scss" scoped></style>
