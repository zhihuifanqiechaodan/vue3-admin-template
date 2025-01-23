import Layout from '@/layout/layout'

export const giveExample = [
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
  },
  {
    path: '/markdown',
    name: 'Markdown',
    component: Layout,
    redirect: '/markdown/index',
    meta: { title: 'Zip', icon: 'zip' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/give-example/markdown/markdown'),
        meta: { title: 'Export Zip' }
      }
    ]
  },
  {
    path: '/dom-to-image',
    component: Layout,
    redirect: '/dom-to-image/index',
    meta: { title: 'Zip', icon: 'zip' },
    children: [
      {
        path: 'index',
        component: () =>
          import('@/views/give-example/dom-to-image/dom-to-image'),
        meta: { title: 'Export Zip' }
      }
    ]
  },
  {
    path: '/qrcode',
    component: Layout,
    redirect: '/qrcode/index',
    meta: { title: 'Zip', icon: 'zip' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/give-example/qrcode/qrcode'),
        meta: { title: 'Export Zip' }
      }
    ]
  },
  {
    path: '/clipboard',
    component: Layout,
    redirect: '/clipboard/index',
    meta: { title: 'Zip', icon: 'zip' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/give-example/clipboard/clipboard'),
        meta: { title: 'Export Zip' }
      }
    ]
  },
  {
    path: '/pie-chart',
    name: 'PieChart',
    component: Layout,
    redirect: '/pie-chart/index',
    meta: {
      title: 'Zip',
      icon: 'zip',
      roles: ['admin']
    },
    children: [
      {
        path: 'index',
        name: 'PieChartIndex',
        component: () => import('@/views/give-example/echart/pie-chart'),
        meta: { title: 'Export Zip' }
      }
    ]
  }
]

export default giveExample
