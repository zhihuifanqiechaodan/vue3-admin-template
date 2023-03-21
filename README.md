# 介绍

[vue3-admin-template](https://github.com/zhihuifanqiechaodan/vue3-admin-template.git)  是一个后台前端解决方案，它基于  [vue](https://github.com/vuejs/vue)  和  [element-plus](https://github.com/element-plus/element-plus.git)实现。它使用了最新的前端技术栈，内置了动态路由，权限验证，提供了多种布局方式，它可以帮助你快速搭建企业级中后台产品原型。相信不管你的需求是什么，本项目都能帮助到你。

> 建议
>
> 本项目的定位是管理后台开发模版，适合当基础模板来进行二次开发，部分公共组件会在后续持续集成，欢迎提 issues。

## 功能

```js
- 登录 / 注销

- 权限验证
  - 页面权限
  - 指令权限
  - 权限配置

- 多环境发布
  - dev sit stage prod

- 全局功能
  - 国际化多语言
  - 多种动态换肤
  - 动态侧边栏（支持多级路由嵌套）
  - 动态面包屑
  - 快捷导航(标签页)
  - Svg Sprite 图标
  - Screenfull全屏
```

## 前序准备

你需要在本地安装  [node](http://nodejs.org/)  和  [git](https://git-scm.com/)。本项目技术栈基于  [ES2015+](http://es6.ruanyifeng.com/)、[element-plus](https://github.com/element-plus/element-plus.git)、[axios](https://github.com/axios/axios.git[)、[pinia](https://github.com/vuejs/pinia.git)、[vue-router](https://github.com/vuejs/vue-router.git)和[vite](https://github.com/vitejs/vite.git)和提前了解和学习这些知识会对使用本项目有很大的帮助。

## 目录结构

本项目已经为你生成了一个完整的开发框架，提供了涵盖中后台开发的各类功能和坑位，下面是整个项目的目录结构。

```js
├── README.md
├── deploy.sh
├── index.html
├── jsconfig.json
├── package.json
├── public
│   └── favicon.ico
├── src
│   ├── App.vue
│   ├── api
│   ├── assets
│   ├── components
│   ├── icons
│   ├── layout
│   ├── main.js
│   ├── permission.js
│   ├── router
│   ├── settings.js
│   ├── store
│   ├── styles
│   ├── utils
│   └── views
├── vite.config.js
├── yarn.loc
└──.env.prod
```

## 安装

```js
# 克隆项目
git clone https://github.com/zhihuifanqiechaodan/vue3-admin-template.git

# 进入项目目录
cd vue3-admin-template

# 安装依赖
yarn install

# 本地开发 启动项目
yarn dev
```

> TIP
>
> 强烈建议使用 yarn 安装依赖，避免使用 npm 或者 cnpm 安装，可能会有各种诡异的 bug。

启动完成后，当你看到下面的页面说明你操作成功了。

- 默认布局

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c76aaa53677e4eedb902d4d8eff26f2c~tplv-k3u1fbpfcp-watermark.image?)

- 经典布局

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/756b3304cbe44070be9d00d2cd1ff977~tplv-k3u1fbpfcp-watermark.image?)

- 单栏布局

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7b33442d9ac408283f2d38d0300b234~tplv-k3u1fbpfcp-watermark.image?)

- 全局管理

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8342beb159a644b398df17778719ac90~tplv-k3u1fbpfcp-watermark.image?)
接下来你可以修改代码进行业务开发了，本项目内建了常用公共组件、全局路由管理等等各种实用的功能来辅助开发，你可以通过查看已有的工具类和封装方法来使用。

> 建议
>
> 使用前建议将目前项目中已有的配置和文件夹工具类先行查看一番，方便后续使用。

## 其它

基于[vue3-admin-template](https://github.com/zhihuifanqiechaodan/vue3-admin-template.git)模版开发管理后台，你可以通过微量的改造来达到符合你司项目的需求。

对于一些开发中常遇到的问题和解决方案欢迎讨论。

欢迎您提供宝贵的意见和建议，也欢迎提 issues 增加和修改功能或组件，另外如果可以的话请给个 start，感谢～
