import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom"
import { ConfigProvider, Switch as SwitchAntd } from "antd"
import moment from "moment"
import BasicLayout from "./pages/BasicLayout"
import "./App.scss"

import zhCN from "antd/es/locale/zh_CN"
import "moment/locale/zh-cn"

moment.locale("zh-cn")

const Login = () => (
  <div>
    <h2>我是登录页面</h2>
  </div>
)

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/" component={BasicLayout} />
        </Switch>
      </Router>
    </ConfigProvider>
  )
}

export default App
