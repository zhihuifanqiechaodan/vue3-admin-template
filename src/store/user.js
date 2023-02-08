import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils/storage'
import { addUserLogin, addUserInfo } from '@/api/user'
import { resetRouter } from '@/router/index'
import { useTagsViewStore } from '@/store/tagsView'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: getToken(), // 登录信息
      userInfo: null, // 用户信息
      roles: [] // 路由权限
    }
  },
  actions: {
    login(userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        addUserLogin({ username: username.trim(), password: password })
          .then((response) => {
            const { data } = response
            this.token = data.token
            setToken(data.token)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    getInfo() {
      return new Promise((resolve, reject) => {
        addUserInfo({ token: this.token })
          .then((response) => {
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
          .catch((error) => {
            reject(error)
          })
      })
    },

    logout() {
      const tagsViewStore = useTagsViewStore()
      return new Promise((resolve) => {
        this.token = ''
        this.roles = []
        removeToken()
        resetRouter()
        tagsViewStore.delAllViews()
        resolve()
      })
    },
    resetToken() {
      return new Promise((resolve) => {
        this.token = ''
        this.roles = []
        removeToken()
        resolve()
      })
    }
  }
})
