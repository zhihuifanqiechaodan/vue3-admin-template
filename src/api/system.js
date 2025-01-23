// import { request } from '@/utils/request'

/**
 * @method addSystemLogin
 * @param {*} data
 * @returns
 */
export const addSystemLogin = (data) => {
  return Promise.resolve({
    token: 'token',
    userInfo: { name: '番茄', avatar: '', roles: [data.username] }
  })
}
