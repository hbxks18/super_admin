import React from 'react';
import { withRouter } from 'react-router-dom';
import { Result, Button } from 'antd';
/**
 * 403页面
 * 参数：url string 点击跳转的地址
 *
 * @param {*} props
 * @returns
 */
const NoFound = (props) => {
  const { url = '/', history } = props;
  const onClickBack = () => {
    history.push(url);
  }
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button onClick={onClickBack} type="primary">Back Home</Button>}
    />
  );
}

export default withRouter(NoFound);