import React from 'react';
import { withRouter } from 'react-router-dom';
import { Result, Button } from 'antd';
/**
 * 404页面
 * 参数：url string 点击跳转的地址
 *
 * @param {*} props
 * @returns
 */
const NoPower = (props) => {
  const { url = '/', history } = props;
  const onClickBack = () => {
    history.push(url);
  }
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={<Button onClick={onClickBack} type="primary">Back Home</Button>}
    />
  );
}

export default withRouter(NoPower);