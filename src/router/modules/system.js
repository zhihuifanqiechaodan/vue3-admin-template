const systemRouter = [
  {
    path: 'menu',
    name: 'menu',
    component: () => import('@/views/system/menu/menu.vue'),
    buttonPermissions: [
      {
        label: '创建',
        value: 0
      },
      {
        label: '创建1',
        value: 1
      }
    ]
  },
  {
    path: 'role',
    name: 'role',
    component: () => import('@/views/system/role/role.vue')
  },
  {
    path: 'user',
    name: 'user',
    component: () => import('@/views/system/user/user.vue')
  }
]

export default systemRouter
