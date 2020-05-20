import React from "react"
import { Layout, Menu, Breadcrumb, Result, Button } from "antd"
import { inject, observer } from "mobx-react"
import styled from "styled-components"
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom"

import router, { config } from "../../router"

import NoFound from "../NoFound"
import NoPower from "../NoPower"

import BreadCrumb from "@/components/BreadCrumb"

import logo from "../../assets/logo.svg"

const { Header, Content, Footer, Sider } = Layout
const { createRoute, createMenu } = router

const LayoutExt = styled(Layout)`
  height: 100vh;
`

const HeaderExt = styled(Header)`
  background-color: #fff;
`

const ContentExt = styled(Content)`
  padding: 0 16px;
`

const SiderContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
const SiderLogo = styled.div`
  text-align: center;
`
const SiderMenu = styled.div`
  flex: 1;
  overflow: auto;
  scrollbar-width: none; /* firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
`

const BreadContent = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
`

const Main = styled.section`
  height: calc(100% - 56px);
  background-color: #fff;
  border-radius: 4px;
  overflow: auto;
  scrollbar-width: none; /* firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  .ant-form {
    margin-bottom: 16px;
    .ant-form-item-control-input-content {
      /* 如果某些表单组件宽度需要撑满，可以在此添加上对应的类名 */
      .ant-input-number,
      .ant-picker {
        width: 100%;
      }
    }
  }
`
@inject("base")
@observer
class BasicLayout extends React.Component {
  state = {
    collapsed: false,
    listen: null,
    selectedKeys: [],
    defaultOpenKeys: [], // 仅打开当前选中项的菜单
  }

  componentWillMount() {
    this.initSelectKeys()
  }
  /**
   * 根据页面路径，进行自动匹配
   *
   * @memberof BasicLayout
   */
  initSelectKeys = () => {
    const {
      location: { pathname },
      history: { listen },
      base,
    } = this.props

    base.setVal("currentOpenkeys", this.getOpenKeysByPathname(pathname))
    base.setVal("currentSelectedKeys", this.getSelectedKeysByPathname(pathname))

    this.listen = listen(({ pathname }) => {
      base.setVal("currentOpenkeys", this.getOpenKeysByPathname(pathname))
      base.setVal(
        "currentSelectedKeys",
        this.getSelectedKeysByPathname(pathname)
      )
    })
  }

  getOpenKeysByPathname = pathname => pathname.split("/").slice(1, -1)

  getSelectedKeysByPathname = pathname => pathname.split("/").slice(1)

  onCollapse = collapsed => {
    const {
      location: { pathname },
      base,
    } = this.props
    if (collapsed) {
      base.setVal("currentOpenkeys", [])
    } else {
      // TODO: 此处每次展开菜单都会把子菜单打开
      base.setVal("currentOpenkeys", this.getOpenKeysByPathname(pathname))
    }
    this.setState({ collapsed })
  }

  onClickMenuItem = ({ item, key, keyPath, domEvent }) => {
    const { history } = this.props
    history.push(`/${keyPath.reverse().join("/")}`)
  }
  onOpenChange = openKeys => {
    const { base } = this.props
    base.setVal("currentOpenkeys", openKeys)
  }

  render() {
    const { base } = this.props
    console.log("xxx", base.getRouteBySelectedKeys)
    return (
      <LayoutExt>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <SiderContent>
            <SiderLogo>
              <img alt="logo" src={logo} />
            </SiderLogo>
            <SiderMenu>
              <Menu
                selectedKeys={base.currentSelectedKeys}
                openKeys={base.currentOpenkeys}
                theme="dark"
                onClick={this.onClickMenuItem}
                onOpenChange={this.onOpenChange}
                mode="inline"
              >
                {createMenu(config, base.auth)}
              </Menu>
            </SiderMenu>
          </SiderContent>
        </Sider>
        <Layout>
          <HeaderExt />
          <ContentExt>
            <BreadContent>
              <BreadCrumb routes={base.getRouteBySelectedKeys} />
            </BreadContent>
            <Main>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => <Redirect to="/Home" />}
                />
                {createRoute(config, base.auth)}
                <Route exact path="/NoPower" component={NoPower} />
                <Route component={NoFound} />
              </Switch>
            </Main>
          </ContentExt>
          <Footer style={{ textAlign: "center" }}>
            Super Admin ©2020 Created by Hbx
          </Footer>
        </Layout>
      </LayoutExt>
    )
  }
}

export default withRouter(BasicLayout)
