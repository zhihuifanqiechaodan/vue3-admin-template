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
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * routesMap
 */
export const routesMap = {
  'layout/index': import('@/layout/index'),
  'views/clipboard/index': import('@/views/clipboard/index'),
  'views/markdown/index': import('@/views/markdown/index'),
  'views/excel/export-excel': import('@/views/excel/export-excel'),
  'views/excel/select-excel': import('@/views/excel/select-excel'),
  'views/excel/merge-header': import('@/views/excel/merge-header'),
  'views/excel/upload-excel': import('@/views/excel/upload-excel'),
  'views/dom-to-image/index': import('@/views/dom-to-image/index'),
  'views/permission/role': import('@/views/permission/role')
}

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/clipboard',
    component: 'layout/index',
    children: [
      {
        path: 'index',
        component: 'views/clipboard/index',
        name: 'Clipboard',
        meta: {
          title: 'Clipboard',
          icon: 'icon',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/markdown',
    component: 'layout/index',
    redirect: '/markdown/index',
    children: [
      {
        path: 'index',
        component: 'views/markdown/index',
        name: 'Markdown',
        meta: {
          title: 'Markdown',
          icon: 'icon',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/excel',
    component: 'layout/index',
    redirect: '/excel/export-excel',
    meta: {
      title: 'Excel',
      icon: 'icon'
    },
    children: [
      {
        path: 'export-excel',
        component: 'views/excel/export-excel',
        name: 'ExportExcel',
        meta: {
          title: 'Export Excel'
        }
      },
      {
        path: 'export-selected-excel',
        component: 'views/excel/select-excel',
        name: 'SelectExcel',
        meta: { title: 'Export Selected' }
      },
      {
        path: 'merge-header',
        component: 'views/excel/merge-header',
        name: 'MergeHeader',
        meta: { title: 'Merge Header' }
      },
      {
        path: 'upload-excel',
        component: 'views/excel/upload-excel',
        name: 'UploadExcel',
        meta: { title: 'Upload Excel' }
      }
    ]
  },
  {
    path: '/dom-to-image',
    component: 'layout/index',
    children: [
      {
        path: 'index',
        component: 'views/dom-to-image/index',
        name: 'DomToImage',
        meta: {
          title: 'DomToImage',
          icon: 'icon',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/external-link',
    component: 'layout/index',
    children: [
      {
        path: 'https://github.com/zhihuifanqiechaodan/vue3-admin-template',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },
  {
    path: '/permission',
    component: 'layout/index',
    children: [
      {
        path: 'role',
        component: 'views/permission/role',
        name: 'PermissionRole',
        meta: { title: 'Permission', icon: 'icon' }
      }
    ]
  }
  // 404 page must be placed at the end !!!
  // { path: '/:pathchMatch(.*)', redirect: '/404' }
]
