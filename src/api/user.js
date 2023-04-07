// import request from '@/utils/request'

/**
 * @method addUserLogin 登录
 * @param {*} data
 * @returns
 */
export function addUserLogin(data) {
  if (data.username === 'admin') {
    return Promise.resolve({ data: { token: 'fanqie-token' } })
  } else {
    return Promise.resolve({ data: { token: 'chaodan-token' } })
  }
  // return request({
  //   url: 'user-login',
  //   method: 'post',
  //   data
  // })
}

/**
 * @method addUserInfo 用户信息
 * @param {*} data
 * @returns
 */
export function addUserInfo(data) {
  if (data.token === 'fanqie-token') {
    return Promise.resolve({
      data: {
        roles: ['admin'],
        components: [
          {
            path: '/chat',
            component: 'layout/index',
            children: [
              {
                path: 'index',
                component: 'views/chat/index',
                name: 'Chat',
                meta: {
                  title: 'Chat',
                  icon: 'icon',
                  roles: ['admin']
                }
              }
            ]
          },
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
                name: 'Vue3AdminTemplate',
                path: 'https://github.com/zhihuifanqiechaodan/vue3-admin-template',
                meta: { title: 'External Link', icon: 'link' }
              }
            ]
          }
        ],
        introduction: 'I am a super administrator',
        avatar:
          'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
      }
    })
  } else {
    return Promise.resolve({
      data: {
        roles: ['dev'],
        introduction: 'I am a super administrator',
        avatar:
          'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'dev'
      }
    })
  }
  // return request({
  //   url: 'user-info',
  //   method: 'post',
  //   data
  // })
}
