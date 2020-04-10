import React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Switch, Redirect, withRouter } from 'react-router-dom';
import { Button, Switch as SwitchAntd } from 'antd';
import BasicLayout from './pages/BasicLayout';
import './App.scss';


const Login = () => (
  <div>
    <h2>我是登录页面</h2>
  </div>
)




function App() {
  return (
    <Router>
      {/* <BasicLayout/> */}
      {/* <Link to='/'>首页</Link>
      <Link to='/about'>关于</Link>
      <NavLink activeClassName='active' to='/about'>关于变红</NavLink> */}
      <Switch>
        <Route exact path='/login' component={Login}/>
        <Route path='/' component={BasicLayout}/>
      </Switch>
    </Router>
  );
}

export default App;
