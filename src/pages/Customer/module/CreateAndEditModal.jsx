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
  Modal,
  message,
} from "antd"
// import { withRouter } from "react-router-dom"
// import { Result, Button } from 'antd';
import styled from "styled-components"
import { observer } from "mobx-react"

import { MODAL_TYPE, GENDER } from "../enum"

const { RangePicker } = DatePicker

const { Option } = Select
const { Item } = Form

/**
 * 新增 OR 编辑 OR 查看的弹窗
 *
 * @param {*} props
 * @returns
 */
const CreateAndEditModal = props => {
  const { customer } = props
  const { modalData } = customer
  const { visible, type } = modalData
  const [form] = Form.useForm()

  useEffect(() => {
    if (visible) {
    } else {
      form.resetFields()
    }
  }, [visible])

  const onFinish = values => {
    customer.create(values, () => {
      message.success("操作成功")
      customer.setVal("modalData", false, "visible")
      customer.load()
    })
  }

  const filters = [
    {
      label: "姓名",
      name: "name",
      el: <Input placeholder="请输入" />,
      otherProps: {
        rules: [{ required: true, message: "Please input your username!" }], // TODO: 校验可以抽离到单独文件
      },
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
  ]

  return (
    <Modal
      visible={visible}
      title={MODAL_TYPE.DATA[type]}
      className="modal-form"
      getContainer={false}
      footer={[
        <Button
          key="cancel"
          onClick={() => customer.setVal("modalData", false, "visible")}
        >
          取消
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={customer.createLoading}
          onClick={() => form.submit()}
        >
          确定
        </Button>,
      ]}
    >
      <Form
        onFinish={onFinish}
        initialValues={
          {
            // gender: "1",
          }
        }
        labelCol={{
          span: 4,
        }}
        form={form}
      >
        <Row gutter={[24]}>
          {filters.map((f, i) => (
            <Col key={i} span={24}>
              <Item {...f.otherProps} label={f.label} name={f.name}>
                {f.el}
              </Item>
            </Col>
          ))}
        </Row>
      </Form>
    </Modal>
  )
}

export default observer(CreateAndEditModal)
