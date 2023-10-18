export const markdown = {
  path: 'markdown',
  name: 'markdown',
  component: () => import('@/views/give-example/markdown/markdown.vue')
}

export const exportExcel = {
  path: 'export-excel',
  name: 'export-excel',
  component: () => import('@/views/give-example/excel/export-excel.vue')
}

export const selectExcel = {
  path: 'select-excel',
  name: 'select-excel',
  component: () => import('@/views/give-example/excel/select-excel.vue')
}

export const mergeHeader = {
  path: 'merge-header',
  name: 'merge-header',
  component: () => import('@/views/give-example/excel/merge-header.vue')
}

export const uploadExcel = {
  path: 'upload-excel',
  name: 'upload-excel',
  component: () => import('@/views/give-example/excel/upload-excel.vue')
}
export const domToImage = {
  path: 'dom-to-image',
  name: 'dom-to-image',
  component: () => import('@/views/give-example/dom-to-image/dom-to-image.vue')
}
export const qrcode = {
  path: 'qrcode',
  name: 'qrcode',
  component: () => import('@/views/give-example/qrcode/qrcode.vue')
}
export const clipboard = {
  path: 'clipboard',
  name: 'clipboard',
  component: () => import('@/views/give-example/clipboard/clipboard.vue')
}

export default [
  markdown,
  exportExcel,
  selectExcel,
  mergeHeader,
  uploadExcel,
  domToImage,
  qrcode,
  clipboard
]
