export default {
  /**
   * 全局
   */
  // 页面标题
  title: 'Vue3 Admin Template',
  // 布局方式 Classic 经典布局 Default 默认布局 Streamline 精简布局
  layoutMode: 'Default',
  // 默认全局尺寸, 可选值 large / default /small
  size: 'large',
  // 全局设置状态
  showSettings: false,
  // 是否显示Logo
  menuLogo: true,

  /**
   * 侧边栏菜单
   */
  //菜单宽度(展开时)，单位px
  menuWidth: 210,
  // 是否水平折叠收起菜单
  menuCollapse: false,
  // 背景色
  menuBackgroundColor: '#304156',
  // 文字颜色
  menuTextColor: '#bfcbd9',
  // 激活项背景色
  menuActiveBackgroundColor: '#304156',
  // 激活项文字色
  menuActiveTextColor: '#409EFF',
  // 菜单项默认图标
  menuDefaultIcon: 'el-icon-Minus',
  // 是否只保持一个子菜单的展开(手风琴)
  menuUniqueOpened: false,
  // The default is only used in the production env，If you want to also use it in dev, you can pass ['production', 'development']
  errorLog: ['production', 'localhost'],
  // 是否基于 mockjs vite-plugin-mock 开启mock数据, 关闭后将开启 proxy 代理
  isMockData: true
}
