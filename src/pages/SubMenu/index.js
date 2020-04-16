import React from 'react';
import { withRouter } from 'react-router-dom';
// import { Result, Button } from 'antd';
import styled from 'styled-components';

import homeImg from '../../assets/Flatt3d-Box.svg'

const HomeWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;


/**
 * 首页
 *
 * @param {*} props
 * @returns
 */
const SubMenu = (props) => {

  return (
    <HomeWrapper>
        SubMenu
    </HomeWrapper>
  );
}

export default SubMenu;