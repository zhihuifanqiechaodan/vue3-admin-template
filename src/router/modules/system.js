export const menu = {
  path: 'menu',
  name: 'menu',
  component: () => import('@/views/system/menu/menu'),
  permissionInfo: {
    create: {
      label: '添加',
      value: 0
    },
    sort: {
      label: '排序',
      value: 1
    },
    edit: {
      label: '编辑',
      value: 2
    }
  }
}

export const role = {
  path: 'role',
  name: 'role',
  component: () => import('@/views/system/role/role')
}

export const user = {
  path: 'user',
  name: 'user',
  component: () => import('@/views/system/user/user')
}

export default [menu, role, user]
