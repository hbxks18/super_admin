import React from 'react';
import { Spin, } from 'antd';
import styled from 'styled-components';


const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;


/**
 * 页面加载loading
 *
 * @param {*} props
 * @returns
 */
const Loading = () => {

  return (
    <Wrapper>
        <Spin size="large" />
    </Wrapper>
  );
}

export default Loading;