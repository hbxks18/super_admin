import React from "react"
import { Form, Input, Button, Radio, InputNumber, Select, Row, Col } from "antd"
// import { withRouter } from "react-router-dom"
// import { Result, Button } from 'antd';
import styled from "styled-components"
import { observer } from "mobx-react"

const { Option } = Select

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

/**
 * 筛选区域
 *
 * @param {*} props
 * @returns
 */
const FunctionsAndSearchToolbar = props => {
  const [form] = Form.useForm()

  const filters = [
    {
      label: "姓名",
      name: "name",
      el: <Input placeholder="input placeholder" />,
      otherProps: {},
    },
    {
      label: "年龄",
      name: "age",
      el: <InputNumber placeholder="input placeholder" />,
      otherProps: {},
    },
    {
      label: "姓名",
      name: "name",
      el: <Input placeholder="input placeholder" />,
      otherProps: {},
    },
  ]

  return <Form {...formItemLayout} layout="inline" form={form}></Form>
}

export default observer(FunctionsAndSearchToolbar)
