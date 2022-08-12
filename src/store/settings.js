import { defineStore } from "pinia";
import defaultSettings from "@/settings";
import { setCookies, getCookies } from "@/utils/storage";
const {
  layoutMode,
  menuWidth,
  showSettings,
  tagsView,
  fixedHeader,
  menuLogo,
  menuCollapse,
  size,
  menuBackgroundColor,
  menuTextColor,
  menuActiveBackgroundColor,
  menuActiveTextColor,
  menuDefaultIcon,
  menuUniqueOpened,
} = defaultSettings;
export const useSettingsStore = defineStore("settings", {
  state: () => {
    return {
      /**
       * 全局
       */
      // 布局方式 Classic 经典布局 Default默认布局 Streamline 精简布局
      layoutMode: getCookies("layoutMode", layoutMode),
      // 默认全局尺寸, 可选值 large / default /small
      size: getCookies("size", size),
      // 展示设置
      showSettings,
      // 是否固定header
      fixedHeader: getCookies("fixedHeader", fixedHeader),
      // 是否展示tagsView
      tagsView: getCookies("tagsView", tagsView),
      // 是否显示Logo
      menuLogo: getCookies("menuLogo", menuLogo),

      /**
       * 侧边栏菜单
       */
      //菜单宽度(展开时)，单位px
      menuWidth: getCookies("menuWidth", menuWidth),
      // 是否水平折叠收起菜单
      menuCollapse: getCookies("menuCollapse", menuCollapse),
      // 背景色
      menuBackgroundColor: getCookies(
        "menuBackgroundColor",
        menuBackgroundColor
      ),
      // 文字颜色
      menuTextColor: getCookies("menuTextColor", menuTextColor),
      // 激活项背景色
      menuActiveBackgroundColor: getCookies(
        "menuActiveBackgroundColor",
        menuActiveBackgroundColor
      ),
      // 激活项文字色
      menuActiveTextColor: getCookies(
        "menuActiveTextColor",
        menuActiveTextColor
      ),
      // 菜单项默认图标
      menuDefaultIcon,
      // 是否只保持一个子菜单的展开(手风琴)
      menuUniqueOpened: getCookies("menuActiveTextColor", menuUniqueOpened),
    };
  },
  actions: {
    setSize(size) {
      this.size = size;
      setCookies("size", size);
    },
    changeSetting({ key, value }) {
      // eslint-disable-next-line no-prototype-builtins
      if (this.hasOwnProperty(key)) {
        this[key] = value;
        setCookies(key, value);
      }
    },
  },
});
