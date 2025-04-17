import { useUserStore } from '@/store/user'

export default (app) => {
  app.directive('hasPermission', {
    mounted(el, binding) {
      const userStore = useUserStore()
      const { value } = binding
      if (!userStore.userInfo.permissionIds.some((item) => item === value)) {
        el.parentNode?.removeChild(el)
      }
    }
  })
}
