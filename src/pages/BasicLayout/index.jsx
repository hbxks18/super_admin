import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';

import logo from '../../assets/logo.svg'


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

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
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <LayoutExt>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <SiderContent>
            <SiderLogo >
              <img alt='logo' src={logo}  />
            </SiderLogo>
            <SiderMenu>
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1">
                  <PieChartOutlined />
                  <span>Option 1</span>
                </Menu.Item>
                <Menu.Item key="2">
                  <DesktopOutlined />
                  <span>Option 2</span>
                </Menu.Item>
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <UserOutlined />
                      <span>User</span>
                    </span>
                  }
                >
                  <Menu.Item key="3">Tom</Menu.Item>
                  <Menu.Item key="4">Bill</Menu.Item>
                  <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  title={
                    <span>
                      <TeamOutlined />
                      <span>Team</span>
                    </span>
                  }
                >
                  <Menu.Item key="6">Team 1</Menu.Item>
                  <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9">
                  <FileOutlined />
                </Menu.Item>
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
              Bill is a cat.
            </Main>
          </ContentExt>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </LayoutExt>
    );
  }
}

export default BasicLayout;