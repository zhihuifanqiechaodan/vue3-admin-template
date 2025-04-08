import Layout from '@/layout/layout'

export default [
  {
    path: '/example',
    name: 'example',
    component: Layout,
    redirect: '/giveExample/markdown',
    meta: {
      title: 'Example',
      icon: 'excel',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'markdown',
        name: 'markdown',
        component: () => import('@/views/example/markdown/markdown'),
        meta: { title: 'Markdown', icon: 'markdown' }
      },
      {
        path: 'dom-to-image',
        name: 'domToImage',
        component: () => import('@/views/example/dom-to-image/dom-to-image'),
        meta: { title: 'DomToImage', icon: 'dom-to-image' }
      },
      {
        path: 'html2canvas',
        name: 'html2canvas',
        component: () => import('@/views/example/html2canvas/html2canvas'),
        meta: { title: 'Html2canvas', icon: 'dom-to-image' }
      },
      {
        path: 'qrcode',
        name: 'qrcode',
        component: () => import('@/views/example/qrcode/qrcode'),
        meta: { title: 'QRCode', icon: 'qrcode' }
      },
      {
        path: 'clipboard',
        name: 'clipboard',
        component: () => import('@/views/example/clipboard/clipboard'),
        meta: { title: 'Clipboard', icon: 'clipboard' }
      },
      {
        path: 'pie-chart',
        name: 'pie-chart',
        component: () => import('@/views/example/echart/pie-chart'),
        meta: { title: 'PieChart', icon: 'chart' }
      },
      {
        path: 'excel',
        name: 'excel',
        meta: { title: 'Excel', icon: 'excel' },
        children: [
          {
            path: 'export-excel',
            name: 'export-excel',
            component: () => import('@/views/example/excel/export-excel'),
            meta: { title: 'Export Excel' }
          },
          {
            path: 'select-excel',
            name: 'select-excel',
            component: () => import('@/views/example/excel/select-excel'),
            meta: { title: 'Export Selected' }
          },
          {
            path: 'merge-header',
            name: 'merge-header',
            component: () => import('@/views/example/excel/merge-header'),
            meta: { title: 'Merge Header' }
          },
          {
            path: 'upload-excel',
            name: 'upload-excel',
            component: () => import('@/views/example/excel/upload-excel'),
            meta: { title: 'Upload Excel' }
          }
        ]
      },
      {
        path: 'https://github.com/zhihuifanqiechaodan/vue3-admin-template',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  }
]
