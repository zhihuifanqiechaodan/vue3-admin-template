import { defineStore } from 'pinia'
import { getCookies, setCookies, removeCookies } from '@/utils/storage'
import { addUserLogin, addUserInfo } from '@/api/user'

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            token: getCookies('Fanqie-Token'), // 登录信息
            userInfo: null, // 用户信息
            roles: [] // 路由权限
        }
    },
    actions: {
        /**
         * @method login 登录
         */
        login(userInfo) {
            const { username, password } = userInfo
            return new Promise((resolve, reject) => {
                addUserLogin({ username: username.trim(), password: password })
                    .then(response => {
                        const { data } = response
                        this.token = data.token
                        setCookies('Fanqie-Token', data.token)
                        resolve()
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        /**
         * @method getInfo 获取用户详情
         */
        getInfo() {
            return new Promise((resolve, reject) => {
                addUserInfo({ token: this.token })
                    .then(response => {
                        const { data } = response

                        if (!data) {
                            reject('Verification failed, please Login again.')
                        }

                        const { roles } = data


                        // roles must be a non-empty array
                        if (!roles || roles.length <= 0) {
                            reject('getInfo: roles must be a non-null array!')
                        }

                        this.userInfo = data
                        this.roles = roles
                        resolve(data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    }
})