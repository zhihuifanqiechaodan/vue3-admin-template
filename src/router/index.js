import { createRouter, createWebHashHistory } from 'vue-router'

/* Layout */
import Layout from '@/layout/index'

/* Router Modules */
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles), 调整为页面动态配置权限，不在需要此字段。
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  // 此写法解决动态路由页面刷新的 warning 警告
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */

/**
 * name：外层路由name必填，退出登录的时候要根据 name 清除动态添加的路由信息，内层的 name 用于页面缓存使用
 */
export const asyncRoutes = [
  {
    path: '/clipboard',
    component: Layout,
    name: 'Clipboard',
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index.vue'),
        name: 'ClipboardIndex',
        meta: {
          title: 'Clipboard',
          icon: 'icon'
        }
      }
    ]
  },
  {
    path: '/markdown',
    component: Layout,
    name: 'Markdown',
    redirect: '/markdown/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/markdown/index.vue'),
        name: 'MarkdownIndex',
        meta: {
          title: 'Markdown',
          icon: 'icon'
        }
      }
    ]
  },
  {
    path: '/excel',
    component: Layout,
    name: 'Excel',
    redirect: '/excel/export-excel',
    meta: {
      title: 'Excel',
      icon: 'icon'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel.vue'),
        name: 'ExportExcel',
        meta: {
          title: 'Export Excel'
        }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel.vue'),
        name: 'SelectExcel',
        meta: { title: 'Export Selected' }
      },
      {
        path: 'merge-header',
        component: () => import('@/views/excel/merge-header.vue'),
        name: 'MergeHeader',
        meta: { title: 'Merge Header' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel.vue'),
        name: 'UploadExcel',
        meta: { title: 'Upload Excel' }
      }
    ]
  },
  {
    path: '/dom-to-image',
    name: 'DomToImage',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/dom-to-image/index.vue'),
        name: 'DomToImageIndex',
        meta: {
          title: 'DomToImage',
          icon: 'icon'
        }
      }
    ]
  },
  {
    path: '/permission',
    name: 'Permission',
    component: Layout,
    redirect: '/permission/role',
    children: [
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'PermissionRole',
        meta: { title: 'Permission', icon: 'icon' }
      }
    ]
  },
  {
    path: '/qrcode',
    name: 'Qrcode',
    component: Layout,
    redirect: '/qrcode/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/qrcode/index'),
        name: 'QrcodeIndex',
        meta: { title: 'Qrcode', icon: 'icon' }
      }
    ]
  },
  {
    path: '/external-link',
    component: Layout,
    name: 'ExternalLink',
    children: [
      {
        path: 'https://github.com/zhihuifanqiechaodan/vue3-admin-template',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

// 重置路由为静态路由
export const resetRouter = () => {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && asyncRoutes.find((item) => item.name === name)) {
      router.removeRoute(name)
    }
  })
}

export default router
