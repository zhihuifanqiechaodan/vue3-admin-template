import Layout from '@/layout/layout'

export const giveExample = [
  {
    path: '/markdown',
    name: 'markdown',
    component: Layout,
    redirect: '/markdown/index',
    children: [
      {
        path: 'index',
        name: 'markdownIndex',
        component: () => import('@/views/give-example/markdown/markdown'),
        meta: { title: 'Markdown', icon: 'markdown' }
      }
    ]
  },
  {
    path: '/dom-to-image',
    name: 'domToImage',
    component: Layout,
    redirect: '/dom-to-image/index',
    children: [
      {
        path: 'index',
        name: 'domToImageIndex',
        component: () =>
          import('@/views/give-example/dom-to-image/dom-to-image'),
        meta: { title: 'DomToImage', icon: 'dom-to-image' }
      }
    ]
  },
  {
    path: '/qrcode',
    name: 'qrcode',
    component: Layout,
    redirect: '/qrcode/index',
    children: [
      {
        path: 'index',
        name: 'qrcodeIndex',
        component: () => import('@/views/give-example/qrcode/qrcode'),
        meta: { title: 'QRCode', icon: 'qrcode' }
      }
    ]
  },
  {
    path: '/clipboard',
    name: 'clipboard',
    component: Layout,
    redirect: '/clipboard/index',
    children: [
      {
        path: 'index',
        name: 'clipboardIndex',
        component: () => import('@/views/give-example/clipboard/clipboard'),
        meta: { title: 'Clipboard', icon: 'clipboard' }
      }
    ]
  },
  {
    path: '/pie-chart',
    name: 'PieChart',
    component: Layout,
    redirect: '/pie-chart/index',
    children: [
      {
        path: 'index',
        name: 'PieChartIndex',
        component: () => import('@/views/give-example/echart/pie-chart'),
        meta: { title: 'Pie Chart', icon: 'chart' }
      }
    ]
  },
  {
    path: '/excel',
    name: 'Excel',
    component: Layout,
    redirect: '/excel/export-excel',
    meta: {
      title: 'Excel',
      icon: 'excel',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'export-excel',
        name: 'ExportExcel',
        component: () => import('@/views/give-example/excel/export-excel'),
        meta: { title: 'Export Excel' }
      },
      {
        path: 'select-excel',
        name: 'SelectExcel',
        component: () => import('@/views/give-example/excel/select-excel'),
        meta: { title: 'Export Selected' }
      },
      {
        path: 'merge-header',
        name: 'MergeExcel',
        component: () => import('@/views/give-example/excel/merge-header'),
        meta: { title: 'Merge Header' }
      },
      {
        path: 'upload-excel',
        name: 'Uploadxcel',
        component: () => import('@/views/give-example/excel/upload-excel'),
        meta: { title: 'Upload Excel' }
      }
    ]
  }
]

export default giveExample
