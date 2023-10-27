import router from '@/router/index'

export default (app) => {
  app.directive('hasPermission', {
    mounted(el, binding) {
      const {
        meta: { permissions = [] }
      } = router.currentRoute.value

      const { value } = binding

      if (typeof value === 'number') {
        if (!permissions.some((item) => item === value)) {
          el.parentNode?.removeChild(el)
        }
      } else {
        throw new Error(
          "need perms! Like v-has-perm=\"['sys:user:add','sys:user:edit']\""
        )
      }
    }
  })
}
