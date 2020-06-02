# 中后台管理系统（范例）

> Super Management System

## ✨ 项目简介

本项目为 React 项目，使用 [Create React App](https://github.com/facebook/create-react-app) 搭建, 在 CRA2 的基础上定制化了 webpack 配置，使用到的技术栈为：

- [React](https://reactjs.org/)
- [Ant Design](https://ant.design/docs/react/introduce-cn)
- [Mobx](https://cn.mobx.js.org/)
- [React Router 4](https://github.com/ReactTraining/react-router)
- [Style components](https://https://styled-components.com/)
- [Sass](https://github.com/webpack-contrib/sass-loader)
- [webpack](https://webpack.docschina.org/concepts/)

## 🔨 开发构建

安装项目的全部依赖

```bash
`npm install` or `yarn`
```

开发模式，运行项目

```bash
`npm start` or `yarn start`
```

生产模式，构建项目

```bash
`npm run build` or `yarn build`
```

## 🔖 目录结构

```
├── README.md
├── build  --项目编译后的目录
├── config --webpack等配置文件目录
├── package-lock.json
├── package.json
├── public   --html模板目录
├── scripts  --webpack启动文件
├── src
├── ├── setupProxy.js  --代理配置（原package.json中的proxy配置）
│   ├── App.scss  --公共样式文件
│   ├── App.js  --主业务入口
│   ├── components  --公共组件文件夹
│   ├── index.js  --SPA生成入口文件
│   ├── pages  --页面文件夹
│   │   ├──Page  --页面文件
│   │   │   ├──store.js  -- 页面store
│   │   │   ├──index.js  -- 页面
│   │   │   ├──services.js  -- ajax
│   │   │   ├──enum.js  -- 使用的常量
│   │   │   ├──module --将页面拆分为几个组件
│   │   │   │   ├──CreateAndEditModal.jsx --弹框
│   │   │   │   ├──DataTable.jsx --表格
│   │   │   │   ├──FunctionsAndSearchToolbar.jsx --查询部分
│   │   │   │   └──OtherComponent.jsx --其他组件
│   ├── assets  --图片图标等资源文件目录
│   ├── stores  --公用store文件与底层基类
│   │   ├── store.js --base store 全局store
│   │   └── Super.js --store的超类工用方法
│   ├── themes --主题文件夹
│   │   └── antd.less --ant design主题文件包
│   └── utils  --工具类
├── yarn-error.log
└── yarn.lock

```

## ⌨️ 使用

### 1.我要从哪开始？

- 在使用`npm start` or `yarn start`启动项目之后，在`pages`文件下新建一个文件夹 📂，命名方式以[PascalCase](https://baike.baidu.com/item/PascalCase)命名，文件结构如下。
- `index.js` 为页面的主文件，可以将页面进行一级组件拆分，将拆分的组件放到`module`下，之后在进行分别进行引用即可；`store.js` 为页面的数据，使用 mobx 的 class 方式创建，无需其他操作，可以自动注入到`index.js`下，直接使用`this.props.pagename`调用（`PS: 注意这里是你创建的文件的名字小写`）当然，store.js 也不是必须的；`services.js` 放该页使用的所有的 ajax 请求，在这里进行统一封装；`enum.js` 将页面里使用的常量进行抽离，可以加上一些适当的注释，方便后来维护，不至于后来维护看不懂 status === 1 这样的代码；`style.scss` 这是可选的，如果要使用 scss，需要在`index.js` 手动 import，推荐在`index.js`直接使用 style-component；`module` 下存放的是进行一级拆分的组件，推荐使用`Function Component`, 如果需要独立状态，可以配合`hooks`使用；
- 创建完上述文件之后，需要在`router.js`下的`config`里进行配置，具体配置参数可查看`router.js`里的注释说明。
- 具体可以查看`Customer`文件下的相关 demo;

```
pages
└──PageName  --文件夹名字
    ├──store.js  -- 页面的数据store
    ├──index.js  -- 页面主文件
    ├──services.js  -- ajax
    ├──enum.js  -- 抽离使用的常量
    ├──style.scss  -- 推荐在index.js直接使用style-component, 当然scss也是可选的
    └── module --将页面拆分为几个组件
        ├──CreateAndEditModal.jsx --弹框
        ├──DataTable.jsx --表格
        ├──FunctionsAndSearchToolbar.jsx --查询部分
        └──OtherComponent.jsx --其他组件
```

### 2.我要使用 antd 组件没有的小图标怎么办？

- 可以使用[iconfont](https://www.iconfont.cn)将需要的使用的小图标以 svg 的方式进行上传，之后生成相应的外链资源，之后配合[antd-iconfont-webpack-plugin](https://www.npmjs.com/package/antd-icontfont-webpack-plugin)在`config/webpack.config.js` 下进行配置，如下。`url`为`iconfont`生成的外链资源地址，`scriptUrl` 需要与`src/components/Iconfont` 下使用的`createFromIconfontCN`的`scriptUrl`保持一致，之后通过引用`Iconfont`组件即可。
- 使用[antd-iconfont-webpack-plugin](https://www.npmjs.com/package/antd-icontfont-webpack-plugin)主要为了解决
  > 因为使用 iconfont.cn 的外链来生成图标在开发上有很多便利，但部分用户因为网络的原因可能无法访问对应的网络资源，所以该插件可以在编译时将 iconfont 的外链资源转换为本地资源，从而解决这个问题。

```js
plugins = [
  new AntdIcontfontWebpackPlugin({
    url: "http://at.alicdn.com/t/font_1813645_saetskfq0x.js",
    scriptUrl: "/static/js/iconfont.js"
  })
]
```

### 3.前端监控

- 使用[sentry](https://sentry.io/)做为前端监控，对代码的侵入性极小，使用方法仅需在`App.js`里使用，dsn 地址需要到[sentry](https://sentry.io/)注册之后获取

```js
import * as Sentry from "@sentry/browser"

process.env.NODE_ENV === "production" &&
  Sentry.init({
    dsn:
      "https://8703dee7bb8b46c794ad0425aafa24d9@o393025.ingest.sentry.io/5241525"
  })
```
