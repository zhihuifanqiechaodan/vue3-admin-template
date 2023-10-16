const giveExampleRouter = [
  {
    path: 'markdown',
    name: 'markdown',
    component: () => import('@/views/give-example/markdown/markdown.vue')
  },
  {
    path: 'export-excel',
    name: 'export-excel',
    component: () => import('@/views/give-example/excel/export-excel.vue')
  },
  {
    path: 'select-excel',
    name: 'select-excel',
    component: () => import('@/views/give-example/excel/select-excel.vue')
  },
  {
    path: 'merge-header',
    name: 'merge-header',
    component: () => import('@/views/give-example/excel/merge-header.vue')
  },
  {
    path: 'upload-excel',
    name: 'upload-excel',
    component: () => import('@/views/give-example/excel/upload-excel.vue')
  },
  {
    path: 'dom-to-image',
    name: 'dom-to-image',
    component: () =>
      import('@/views/give-example/dom-to-image/dom-to-image.vue')
  },
  {
    path: 'qrcode',
    name: 'qrcode',
    component: () => import('@/views/give-example/qrcode/qrcode.vue')
  },
  {
    path: 'clipboard',
    name: 'clipboard',
    component: () => import('@/views/give-example/clipboard/clipboard.vue'),
    buttonPermissions: [
      {
        label: '创建',
        value: 0
      },
      {
        label: '删除',
        value: 1
      }
    ]
  }
]

export default giveExampleRouter
