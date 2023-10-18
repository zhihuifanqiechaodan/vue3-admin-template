export const menu = {
  path: 'menu',
  name: 'menu',
  component: () => import('@/views/system/menu/menu'),
  permissionInfo: {
    create: {
      label: '创建',
      value: 1
    },
    delete: {
      label: '删除',
      value: 3
    },
    edit: {
      label: '编辑',
      value: 0
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
