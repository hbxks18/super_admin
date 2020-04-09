import React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Switch, Redirect, withRouter } from 'react-router-dom';
import { Button, Switch as SwitchAntd } from 'antd';
import BasicLayout from './pages/BasicLayout';
import './App.scss';

const Home = (props) => {
  console.log(props);
  return (
    <div>
      <h2><SwitchAntd /></h2>
    </div>
  );
}

const About = () => (
  <div>
    <Button type="primary">About</Button>
  </div>
)

const NoMatch = () => (
  <div>
    <h2>404</h2>
  </div>
)




function App() {
  return (
    <Router>
      <BasicLayout/>
      {/* <Link to='/'>首页</Link>
      <Link to='/about'>关于</Link>
      <NavLink activeClassName='active' to='/about'>关于变红</NavLink>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/about' component={About}/>
        <Route component={NoMatch}/>
      </Switch> */}

    </Router>
  );
}

export default App;
