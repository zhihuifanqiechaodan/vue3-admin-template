import request from '@/utils/request'

/**
 * @method addUserLogin 登录
 * @param {*} data 
 * @returns 
 */
export function addUserLogin(data) {
    return Promise.resolve({ "data": { "token": "fanqie-token" } })
    return request({
        url: 'user-login',
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
    return Promise.resolve({ "data": { "roles": ["admin"], "introduction": "I am a super administrator", "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif", "name": "Super Admin" } })
    return request({
        url: 'user-info',
        method: 'post',
        data
    })
}