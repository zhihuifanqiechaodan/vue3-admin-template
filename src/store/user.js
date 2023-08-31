import { defineStore } from 'pinia'
import { setCookieItem, getCookieItem, removeCookieItem } from '@/utils/storage'
import { resetRouter } from '@/router/index'
import { useTagsViewStore } from '@/store/tagsView'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: getCookieItem('token'),
      userInfo: getCookieItem('userInfo')
    }
  },
  actions: {
    setToken({ token }) {
      this.token = token

      setCookieItem('token', token)
    },
    setUserInfo({ userInfo }) {
      this.userInfo = userInfo

      setCookieItem('userInfo', userInfo)
    },
    logout() {
      const tagsViewStore = useTagsViewStore()
      return new Promise((resolve) => {
        this.token = ''

        this.userInfo = null

        removeCookieItem('token')

        removeCookieItem('userInfo')

        resetRouter()

        tagsViewStore.delAllViews()

        resolve()
      })
    },
    resetToken() {
      return new Promise((resolve) => {
        this.token = ''

        this.userInfo = null

        removeCookieItem('token')

        removeCookieItem('userInfo')

        resolve()
      })
    }
  }
})
