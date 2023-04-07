import { adminRoutes, editorRoutes } from '@/mock/routes'
import { cloneDeep as _cloneDeep } from 'lodash'

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}
const users = {
  'admin-token': {
    roles: ['admin'],
    description: 'I am a super administrator',
    name: 'Super Admin',
    routes: _cloneDeep(adminRoutes)
  },
  'editor-token': {
    roles: ['editor'],
    description: 'I am an editor',
    routes: _cloneDeep(editorRoutes)
  }
}

export default [
  {
    url: '/user-login',
    method: 'post',
    response: (config) => {
      const { username } = config.body
      const token = tokens[username]
      return {
        code: 20000,
        data: token,
        msg: ''
      }
    }
  },
  {
    url: '/user-info',
    method: 'post',
    response: (config) => {
      const { token } = config.body
      const info = users[token]
      return {
        code: 20000,
        data: info,
        msg: ''
      }
    }
  }
]
