import React from 'react';
import { Layout, Menu, Breadcrumb, Result, Button } from 'antd';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link, NavLink, Switch, Redirect, withRouter } from 'react-router-dom';

import { createRoute, createMenu, config } from '../../router';

import NoFound from '../NoFound';
import NoPower from '../NoPower';


import logo from '../../assets/logo.svg'


const { Header, Content, Footer, Sider } = Layout;

const LayoutExt = styled(Layout)`
  height: 100vh;
`;

const HeaderExt = styled(Header)`
  background-color: #fff;
`;

const ContentExt = styled(Content)`
  padding: 0 16px;
`;

const SiderContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const SiderLogo = styled.div`
  text-align: center;
`;
const SiderMenu = styled.div`
  flex: 1;
  overflow: auto;
  scrollbar-width: none; /* firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
`;

const BreadContent = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
`;

const Main = styled.section`
  height: calc( 100% - 56px );
  background-color: #fff;
  border-radius: 4px;
  overflow: auto;
  scrollbar-width: none; /* firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
`;


class BasicLayout extends React.Component {
  state = {
    collapsed: false,
    selectedKeys: [],
    defaultOpenKeys: [], // 仅打开当前选中项的菜单
  };

   

  componentWillMount() {
    this.initSelectKeys();
  }
  /**
   * 根据页面路径，进行自动匹配
   *
   * @memberof BasicLayout
   */
  initSelectKeys = () => {
    const { location: { pathname } } = this.props;
    this.setState({
      // selectedKeys: pathname.split('/').slice(1),
      defaultOpenKeys: pathname.split('/').slice(1, -1),
    });
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  onClickMenuItem = ({ item, key, keyPath, domEvent }) => {
    const { history } = this.props;
    history.push(`/${keyPath.reverse().join('/')}`);
    console.log('keyPath',keyPath)
  }

  render() {
    // TODO: 当前选中项是根据路由自动匹配，但是展开项只是只使用了默认项，没有受控
    const { location: { pathname } } = this.props;
    const selectedKeys = pathname.split('/').slice(1);
    const { defaultOpenKeys } = this.state;
    return (
      <LayoutExt>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <SiderContent>
            <SiderLogo >
              <img alt='logo' src={logo}  />
            </SiderLogo>
            <SiderMenu>
              <Menu 
                selectedKeys={selectedKeys}
                defaultOpenKeys={defaultOpenKeys}
                theme="dark" 
                onClick={this.onClickMenuItem}
                mode="inline">
                {createMenu(config, [])}
              </Menu>
            </SiderMenu>
          </SiderContent>
        </Sider>
        <Layout>
          <HeaderExt/>
          <ContentExt>
            <BreadContent>
              <Breadcrumb>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
            </BreadContent>
            <Main>
              <Switch>
                <Route exact path='/' render={props => <Redirect to='/Home' />}/>
                {createRoute(config, [])}
                <Route exact path='/NoPower' component={NoPower}/>
                <Route component={NoFound}/>
              </Switch>
            </Main>
          </ContentExt>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </LayoutExt>
    );
  }
}

export default withRouter(BasicLayout);