import { asyncRoutes } from '@/mock/routes'
import { cloneDeep as _cloneDeep } from 'lodash'

const routes = _cloneDeep(asyncRoutes)

export default [
  {
    url: '/user-login',
    method: 'post',
    response: () => {
      return {
        code: 20000,
        data: { token: 'fanqie-token' },
        msg: ''
      }
    }
  },
  {
    url: '/user-info',
    method: 'post',
    response: () => {
      return {
        code: 20000,
        data: {
          roles: ['admin'],
          routes,
          description: 'I am a super administrator',
          name: 'Super Admin'
        },
        msg: ''
      }
    }
  }
]
