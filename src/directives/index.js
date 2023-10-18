import permission from './permission'

const directives = {
  permission
}
export default {
  install(app) {
    Object.values(directives).forEach((directive) => {
      directive(app)
    })
  }
}
