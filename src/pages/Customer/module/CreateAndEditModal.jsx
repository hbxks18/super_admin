import React from "react"
import { Modal, Button } from "antd"
// import { withRouter } from "react-router-dom"
// import { Result, Button } from 'antd';
import styled from "styled-components"
import { observer } from "mobx-react"

import { MODAL_TYPE } from "../enum"

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
  return (
    <Modal
      visible={visible}
      title={MODAL_TYPE.DATA[type]}
      footer={[
        <Button key="back" onClick={() => {}}>
          取消
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={false}
          onClick={() => customer.setVal("modalData", false, "visible")}
        >
          确定
        </Button>,
      ]}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  )
}

export default observer(CreateAndEditModal)
