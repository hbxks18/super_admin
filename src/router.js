import React from "react"
import { HomeOutlined, MenuOutlined } from "@ant-design/icons"
import { Menu, Spin, Result, Button, Typography } from "antd"
import { Route } from "react-router-dom"
import Loadable from "react-loadable"

import Loading from "@/components/Loading"
/**
 * 路由相关配置
 * name: string 当前页面名称，在面包屑中的展示名称
 * icon: reactDom 因为icon的可能是官方的也可能是自定义的，所以此处统一使用传组件的形式
 * auth: string|number|boolean 权限校验，此块内容待定
 * hide: boolean 是否在菜单栏展示该块内容
 * key: string 对应的pages文件夹的目录，默认使用该名称作为路由
 * path: string path会覆盖key
 * children: array 内容与上方配置一致
 */

const { SubMenu } = Menu
const { Item } = Menu
export const config = [
  {
    name: "首页",
    icon: <HomeOutlined />,
    auth: true,
    key: "Home",
  },
  {
    name: "菜单",
    icon: <MenuOutlined />,
    auth: true,
    key: "Menu",
    children: [
      {
        name: "子菜单",
        auth: true,
        key: "SubMenu",
      },
      {
        name: "子菜单1",
        auth: true,
        key: "SubMenu1",
      },
      {
        name: "客户列表",
        auth: true,
        key: "Customer",
      },
    ],
  },
]
/**
 * 创建菜单
 *
 */
export const createMenu = (config = [], auth) => {
  if (!config || !config.length) {
    return []
  }
  return config.map(m => {
    // TODO: 权限逻辑的判断
    if (m.hide) {
      return null
    }
    const isSubMenu = !!m.children?.length
    // const Icon = m.icon ? m.icon : null;
    if (isSubMenu && m.children.some(sub => !sub.hide)) {
      return (
        <SubMenu
          key={m.path || m.key}
          title={
            <span>
              {m.icon ? m.icon : null}
              <span>{m.name}</span>
            </span>
          }
        >
          {createMenu(m.children, auth)}
        </SubMenu>
      )
    }
    return (
      <Item key={m.path || m.key}>
        {m.icon ? m.icon : null}
        <span>{m.name}</span>
      </Item>
    )
  })
}

const generateRoute = (config = [], path = "/", result = [], auth) => {
  config.forEach(r => {
    // 如果children 不存在，说明没有子项，则存在页面
    // 如果children 存在，但是所有的子项的都是hide，也说明，存在页面
    if (!r.children || r.children.every(i => i.hide)) {
      const LoadableComponent = Loadable.Map({
        delay: 200,
        loader: {
          page: () => import(`@/pages/${r.key}`),
          pageStore: () => import(`@/pages/${r.key}/store.js`),
          baseStore: () => import(`@/store/store.js`),
        },
        loading: props => {
          if (props.error) {
            return (
              <Result
                status="error"
                title="加载失败"
                subTitle={JSON.stringify(props.error.message)}
              />
            )
          } else if (props.isLoading) {
            return <Loading />
          }
          return null
        },
        render(loaded, props) {
          const Component = loaded.page.default
          const pageStoreName = r.key.toLocaleLowerCase()
          const stores = {
            base: loaded.baseStore.default,
            [pageStoreName]: loaded.pageStore.default,
          }
          return <Component {...props} {...stores} />
        },
      })
      result.push(
        <Route
          exact
          key={`${path}${r.key}`}
          path={`${path}${r.key}`}
          component={LoadableComponent}
        />
      )
    } else {
      generateRoute(r.children, `${path}${r.key}/`, result, auth)
    }
  })
  return result
}
/**
 * 创建路由
 *
 */
export const createRoute = (config = [], auth) => {
  const routeArr = generateRoute(config, "/", [], auth)
  return routeArr
}
