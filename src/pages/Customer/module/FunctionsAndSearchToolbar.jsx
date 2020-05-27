import React, { useEffect } from "react"
import {
  Form,
  Input,
  Button,
  InputNumber,
  Select,
  Row,
  Col,
  DatePicker,
} from "antd"
// import { withRouter } from "react-router-dom"
// import { Result, Button } from 'antd';
import styled from "styled-components"
import { observer } from "mobx-react"

import { GENDER } from "../enum"

const { RangePicker } = DatePicker

const { Option } = Select
const { Item } = Form

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  .ant-btn {
    margin-right: 8px;
    &:last-child {
      margin-right: 0;
    }
  }
`

/**
 * 筛选区域
 *
 * @param {*} props
 * @returns
 */
const FunctionsAndSearchToolbar = props => {
  const { customer } = props
  const [form] = Form.useForm()

  useEffect(() => {
    customer.load()
    return () => {
      customer.clear()
    }
  }, [])

  const onFinish = values => {
    customer.setVal("query", values)
    customer.load()
  }

  const onRest = () => form.resetFields()

  const filters = [
    {
      label: "姓名",
      name: "name",
      el: <Input placeholder="请输入" />,
      otherProps: {},
    },
    {
      label: "地址",
      name: "address",
      el: <Input placeholder="请输入" />,
      otherProps: {},
    },
    {
      label: "年龄",
      name: "age",
      el: <InputNumber min={0} placeholder="请输入" />,
      otherProps: {},
    },
    {
      label: "性别",
      name: "gender",
      el: (
        <Select placeholder="请选择">
          <Option value="">全部</Option>
          {Object.entries(GENDER).map(([k, v]) => (
            <Option key={k} value={k}>
              {v}
            </Option>
          ))}
        </Select>
      ),
      otherProps: {},
    },
    {
      label: "出生日期",
      name: "birth_date",
      el: <DatePicker placeholder="请选择" />,
      otherProps: {},
    },
    {
      label: "筛选的时间",
      name: "filter_date",
      el: <RangePicker placeholder={["起始日期", "结束日期"]} />,
      otherProps: {},
    },
  ]

  return (
    <Form
      onFinish={onFinish}
      initialValues={{
        gender: "",
      }}
      form={form}
    >
      <Row gutter={[24]}>
        {filters.map((f, i) => (
          <Col key={i} span={8}>
            <Item {...f.otherProps} label={f.label} name={f.name}>
              {f.el}
            </Item>
          </Col>
        ))}
      </Row>
      <Row gutter={[24]}>
        <Col span={24}>
          <ButtonGroup>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button onClick={onRest}>重置</Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Form>
  )
}

export default observer(FunctionsAndSearchToolbar)
