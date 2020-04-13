import React from 'react';
import {
  HomeOutlined,
  MenuOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
/**
 * 路由相关配置
 * name: string 当前页面名称，在面包屑中的展示名称
 * icon: reactDom 因为icon的可能是官方的也可能是自定义的，所以此处统一使用传组件的形式
 * auth: string|number|boolean 权限校验，此块内容待定
 * hide: boolean 是否在菜单栏展示该块内容
 * folderName: string 对应的pages文件夹的目录，默认使用该名称作为路由
 * path: string path会覆盖folderName
 * children: array 内容与上方配置一致
 */

const { SubMenu } = Menu;
const { Item } = Menu;
export const config = [
  {
    name: '首页',
    icon: <HomeOutlined />,
    auth: true,
    path: 'home',
  },
  {
    name: '菜单',
    icon:<MenuOutlined />,
    auth: true,
    path: 'menu',
    children: [
      {
        name: '子菜单',
        auth: true,
        path: 'subMenu',
        children: [
          {
            name: '子子菜单',
            auth: true,
            path: 'subsubMenu',
          }
        ],
      }
    ],
  },


];
/**
 * 创建菜单
 *
 */
export const createMenu = (config = [], auth) => {
  if (!config || !config.length) {
    return [];
  }
  return config.map(m => {
    // TODO: 权限逻辑的判断
    if (m.hide) {
      return null;
    }
    const isSubMenu = !!m.children?.length;
    // const Icon = m.icon ? m.icon : null;
    if (isSubMenu) {
      return (
      <SubMenu 
        key={m.path || m.folderName}
        title={
          <span>
            {m.icon ? m.icon : null}
            <span>{m.name}</span>
          </span>
        }
      >
        {createMenu(m.children, auth)}
      </SubMenu>);
    }
    return (
    <Item
      key={m.path || m.folderName}
    >
      {m.icon ? m.icon : null}
      <span>{m.name}</span>
    </Item>);
  })
}