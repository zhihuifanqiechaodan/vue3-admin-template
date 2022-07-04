import request from '@/utils/request'

/**
 * @method addUserLogin 登录
 * @param {*} data 
 * @returns 
 */
export function addUserLogin(data) {
    return { "code": 20000, "data": { "token": "fanqie-token" } }
    return request({
        url: 'user-login',
        method: 'post',
        data
    })
}