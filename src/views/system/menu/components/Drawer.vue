<template>
  <div class="drawer-wrapper">
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
                :disabled="props.isEdit"
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
              :disabled="
                props.isEdit &&
                menuFormComputed.layout === defaultLayoutRoute.layout
              "
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
              用于控制目录或菜单是否认证，不认证的话任何用户将返回当前目录或菜单
            </p>
          </el-alert>
          <el-form-item label="auth">
            <el-radio-group v-model="menuFormComputed.auth">
              <el-radio
                v-for="item in authTypeList"
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
              你可以设置 show:
              true，这样它就会忽略之前定义的规则，一直显示根路由
            </p>
          </el-alert>
          <el-form-item label="show">
            <el-radio-group v-model="menuFormComputed.show">
              <el-radio
                v-for="item in menushowTypeList"
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
        <el-space v-if="menuFormComputed.type === 1" fill>
          <el-alert type="info" show-icon :closable="false">
            <p>展示未添加的路由</p>
          </el-alert>
          <el-form-item label="path" prop="path">
            <el-select
              v-model="menuFormComputed.path"
              filterable
              placeholder="Select menu path"
            >
              <el-option
                v-for="item in filterAsyncRoutes"
                :key="item.path"
                :label="item.path"
                :value="item.path"
              />
            </el-select>
          </el-form-item>
        </el-space>
        <el-space
          v-if="
            menuFormComputed.type === 1 &&
            menuFormComputed.path &&
            permissionList.length
          "
          fill
        >
          <el-alert type="info" show-icon :closable="false">
            <p>展示当前页面按钮权限</p>
          </el-alert>
          <el-form-item label="permissions">
            <div class="page-button-permissions">
              <el-tag v-for="item in permissionList" :key="item.id">{{
                item.label
              }}</el-tag>
            </div>
          </el-form-item>
        </el-space>

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
          <el-form-item label="cache">
            <el-radio-group v-model="menuFormComputed.cache">
              <el-radio
                v-for="item in cacheTypeList"
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
          <el-button
            :loading="loading"
            type="primary"
            @click="submitForm(menuFormRef)"
          >
            {{ props.isEdit ? '更新' : '确定' }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup>
import { computed, reactive, ref, toRefs } from 'vue'
import svgIds from 'virtual:svg-icons-names'
import { asyncRoutes, defaultLayoutRoute, layoutRoutes } from '@/router/index'
import { addSystemMenuAddMenu, addSystemMenuUpdateMenu } from '@/api/system'
import { ElMessageBox } from 'element-plus'
import { pick as _pick } from 'lodash-es'
import SvgIcon from '@/components/SvgIcon/index'

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

const authTypeList = [
  { label: true, name: '认证' },
  { label: false, name: '不认证' }
]

const menuHiddenTypeList = [
  { label: true, name: '隐藏' },
  { label: false, name: '显示' }
]

const menushowTypeList = [
  { label: true, name: '显示' },
  { label: false, name: '隐藏' }
]

const cacheTypeList = [
  { label: true, name: '缓存' },
  { label: false, name: '不缓存' }
]

const breadcrumbTypeList = [
  { label: true, name: '显示' },
  { label: false, name: '隐藏' }
]

const affixTypeList = [
  { label: true, name: '固定' },
  { label: false, name: '不固定' }
]

const props = defineProps([
  'isEdit',
  'menuForm',
  'menuDrawerVisible',
  'menuList'
])

const emits = defineEmits([
  'update:menuDrawerVisible',
  'update:menuForm',
  'initData'
])

const menuFormRef = ref(null)

const state = reactive({
  loading: false
})

const { loading } = toRefs(state)

const drawerVisible = computed({
  get: () => props.menuDrawerVisible,
  set: (value) => emits('update:menuDrawerVisible', value)
})

const filterAsyncRoutes = computed(() => {
  return asyncRoutes.filter(
    (item) => !props.menuList.some((item2) => item.path === item2.path)
  )
})

const drawerTitle = computed(() => (props.isEdit ? '编辑菜单' : '添加菜单'))

const iconList = computed(() => svgIds.map((item) => item.replace('icon-', '')))

const menuFormComputed = computed({
  get: () => props.menuForm,
  set: (value) => emits('update:menuForm', value)
})

const permissionList = computed(() => {
  const route = asyncRoutes.find((item) => item.path === props.menuForm.path)

  return Object.values(route.permissionInfo || {})
})

const submitForm = async (menuFormRef) => {
  if (!menuFormRef) return

  menuFormRef.validate(async (valid, fields) => {
    if (valid) {
      ElMessageBox.confirm('创建或更新后将刷新页面', 'Tips', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          state.loading = true

          const data = props.menuForm

          let field

          if (props.menuForm.type === 1 && permissionList.value.length) {
            data.buttonPermissions = permissionList.value
          }

          try {
            if (props.isEdit) {
              if (props.menuForm.type === 0) {
                field = [
                  'id',
                  'type',
                  'layout',
                  'auth',
                  'hidden',
                  'show',
                  'title',
                  'icon'
                ]
              } else if (props.menuForm.type === 1) {
                field = [
                  'id',
                  'type',
                  'auth',
                  'hidden',
                  'title',
                  'path',
                  'buttonPermissions',
                  'icon',
                  'cache',
                  'affix',
                  'breadcrumb',
                  'activeMenu'
                ]
              }

              await addSystemMenuUpdateMenu(_pick(data, field))
            } else {
              if (props.menuForm.type === 0) {
                field = [
                  'type',
                  'layout',
                  'auth',
                  'hidden',
                  'show',
                  'title',
                  'icon'
                ]
              } else if (props.menuForm.type === 1) {
                field = [
                  'type',
                  'auth',
                  'hidden',
                  'title',
                  'path',
                  'buttonPermissions',
                  'icon',
                  'cache',
                  'affix',
                  'breadcrumb',
                  'activeMenu'
                ]
              }
              await addSystemMenuAddMenu(_pick(data, field))
            }

            location.reload()
          } catch (error) {
            console.log(
              '🚀 ~ file: Drawer.vue:303 ~ menuFormRef.validate ~ error:',
              error
            )
          }

          state.loading = false
        })
        .catch(() => {})
    } else {
      console.log(
        '🚀 ~ file: Drawer.vue:278 ~ menuFormRef.validate ~ fields:',
        fields
      )
    }
  })
}
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
