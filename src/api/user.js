import { request } from '@/utils/request'

/**
 * @method addUserLogin 登录
 * @param {*} data
 * @returns
 */
export function addUserLogin(data) {
  return request({
    url: '/user-login',
    method: 'post',
    data
  })
}

/**
 * @method addUserInfo 用户信息
 * @param {*} data
 * @returns
 */
export function addUserInfo(data) {
  return request({
    url: '/user-info',
    method: 'post',
    data
  })
}
