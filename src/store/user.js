import { defineStore } from 'pinia'
import { getCookies, setCookies, removeCookies } from '@/utils/storage'
import { addUserLogin } from '@/api/user'

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            token: getCookies(), // 登录信息
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
                        const data = response
                        this.token = data.token
                        setCookies('Fanqie-Token', data.token)
                        resolve()
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    }
})