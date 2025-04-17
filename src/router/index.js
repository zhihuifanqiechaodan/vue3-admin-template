import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/layout'
import { usePermissionStore } from '@/store/permission'
import exampleRouter from './modules/example'

/**
 * 当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * 
 * hidden: true
 * 
 * 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 * 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 * 若你想不管路由下面的 children 声明的个数都显示你的根路由
 * 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * 
 * alwaysShow: true
 * 
 * 因为路由的设计模式，只能当路由为目录时，才可设置此选项，或者当当前路由只有一个菜单的时候，会自动生成外层目录，如果设置了noRedirect，则不会在breadcrumb中重定向
 * 
 * redirect: 'noRedirect'
 * 
 * 用于退出登录时清空动态添加的路由信息，路由的name字段必须为路由的文件名，缓存页面时需要
 * 在 3.2.34 或以上的版本中，使用 <script setup> 的单文件组件会自动根据文件名生成对应的 name 选项，无需再页面上手动声明name。
 * name必须和你的文件名保持一致，否则会导致不缓存, 所以文件名不要使用index
 * 
 * name:'router-name'
 * 
 * meta : {
    设置该路由在侧边栏和面包屑中展示的名字
    title: 'title' 
    
    设置该路由的图标
    icon: 'menu'

    如果设置为true，则不会被 <keep-alive> 缓存(默认 true)
    noCache: true

    如果设置为true，它则会固定在tags-view中(默认 false, 只在经典布局中展示)
    affix: false               

    如果设置为false，则不会在breadcrumb面包屑中显示(默认 true，只在经典布局中展示)
    breadcrumb: false            

    当路由设置了该属性，则会高亮相对应的侧边栏。
    这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
    点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
    activeMenu: '/example/list'如果设置了path，侧边栏会高亮显示你设置的路径
  }
 */

/**
 * 代表那些不需要动态判断权限的路由，如登录页、404、等通用页面。
 * 没有权限要求的页面
 * 所有角色都可以访问
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/system/redirect/redirect')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/system/login/login'),
    hidden: true
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/system/error-page/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/system/dashboard/dashboard'),
        name: 'dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  ...exampleRouter
]

/**
 * 有权限要求的页面
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/user',
    meta: { title: 'Permission', icon: 'lock', pageId: 100 },
    children: [
      {
        path: 'user',
        component: () => import('@/views/system/permission/user'),
        name: 'user',
        meta: {
          title: 'User',
          icon: 'dashboard',
          pageId: 101,
          buttonIds: [{ buttonId: 1010, buttonText: '添加用户' }]
        }
      },
      {
        path: 'role',
        component: () => import('@/views/system/permission/role'),
        name: 'role',
        meta: {
          title: 'Role',
          icon: 'dashboard',
          pageId: 102,
          buttonIds: [
            { buttonId: 1020, buttonText: '创建' },
            { buttonId: 1021, buttonText: '编辑' },
            { buttonId: 1022, buttonText: '删除' }
          ]
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

/**
 * @method resetRouter
 */
export const resetRouter = () => {
  const permissionStore = usePermissionStore()

  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && permissionStore.addRoutes.find((item) => item.name === name)) {
      router.removeRoute(name)
    }
  })
}

export default router
