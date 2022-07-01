import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils/storage'

export const useUserStore = defineStore({
    state: () => {
        return {
            token: getToken(), // 登录信息
            userInfo: null, // 用户信息
            roles: [] // 路由权限
        }
    },
    actions: {
        
    }
})