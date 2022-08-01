export default {
  /**
   * 全局
   */
  // 页面标题
  title: "Vue3 Element Admin",
  // 布局方式
  layoutMode: "Classic",
  // 全局设置状态
  showSettings: true,
  // 是否展示tagsView
  tagsView: true,
  // 是否固定header
  fixedHeader: false,
  // 是否显示Logo
  menuLogo: true,
  // 默认全局尺寸, 可选值 large / default /small
  size: "small",

  /**
   * 侧边栏菜单
   */
  // 背景色
  menuBackgroundColor: "#304156",
  // 文字颜色
  menuTextColor: "#bfcbd9",
  // 激活项背景色
  menuActiveBackgroundColor: "#304156",
  // 激活项文字色
  menuActiveTextColor: "#409EFF",
  //菜单宽度(展开时)，单位px
  menuWidth: 210,
  // 菜单项默认图标
  menuDefaultIcon: "el-icon-Minus",
  // 是否水平折叠收起菜单
  menuCollapse: false,
  // 是否只保持一个子菜单的展开(手风琴)
  menuUniqueOpened: false,
  // The default is only used in the production env，If you want to also use it in dev, you can pass ['production', 'development']
  errorLog: ["production", "local"],
};
