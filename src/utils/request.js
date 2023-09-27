import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/store/user'

// 业务请求
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
})

// request interceptor
request.interceptors.request.use(
  (config) => {
    // do something before request is sent
    const userStore = useUserStore()

    if (userStore.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['authorization'] = userStore.token
      config.headers['userId'] = userStore.userInfo.id
    }
    return config
  },
  (error) => {
    console.log('🚀 ~ file: request.js:27 ~ error:', error)
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
request.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const { code, data, msg } = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (code !== 200) {
      ElMessage({
        msg: msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if ([50008, 50012, 50014].includes(code)) {
        // to re-login
        ElMessageBox.confirm(
          'You have been logged out, you can cancel to stay on this page, or log in again',
          'Confirm logout',
          {
            confirmButtonText: 'Re-Login',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }
        ).then(() => {
          const userStore = useUserStore()
          userStore.resetToken.then(() => {
            location.reload()
          })
        })
      } else {
        return Promise.reject(new Error(msg || 'Error'))
      }
    } else {
      return data
    }
  },
  (error) => {
    console.log('🚀 ~ file: request.js:80 ~ error:', error)

    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

/**
 * 用于请求 gitee 的数据
 */
const requestA = axios.create({
  baseURL: import.meta.env.VITE_APP_GITEE_BASE_API, // url = base url + request url
  timeout: 60 * 1000
})

requestA.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.log('🚀 ~ file: request.js:103 ~ error:', error)
    return Promise.reject(error)
  }
)

requestA.interceptors.response.use(
  (response) => {
    const { data, status, statusText } = response
    if (status === 200) {
      return data
    } else {
      ElMessage({
        msg: statusText || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return false
    }
  },
  (error) => {
    console.log('🚀 ~ file: request.js:123 ~ error:', error)

    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export { request, requestA }
