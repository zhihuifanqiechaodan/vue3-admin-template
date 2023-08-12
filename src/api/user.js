import { request } from '@/utils/request'

/**
 * @method addUserLogin
 * @param {*} data
 * @returns
 */
export function addUserLogin(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

/**
 * @method getUserMenuList
 * @param {*} data
 * @returns
 */
export function getUserMenuList(data) {
  return request({
    url: '/user/menu_list',
    method: 'get',
    params: data
  })
}
