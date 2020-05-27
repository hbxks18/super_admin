import React from "react"
import { Table, Tag } from "antd"
// import { withRouter } from "react-router-dom"
// import { Result, Button } from 'antd';
import styled from "styled-components"
import { observer } from "mobx-react"

import { GENDER } from "../enum"

import { MODAL_TYPE } from "../enum"

/**
 * 表格区域
 *
 * @param {*} props
 * @returns
 */
const DataTable = props => {
  const { customer } = props
  const onClickView = () => {
    customer.setVal("modalData", {
      visible: true,
      type: MODAL_TYPE.DEFINE.VIEW,
    })
  }
  const columns = [
    {
      title: "名字",
      dataIndex: "name",
      key: "name",
      render: text => <a>{text}</a>,
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "性别",
      key: "gender",
      dataIndex: "gender",
      render: gender => <Tag>{GENDER[gender]}</Tag>,
    },
    {
      title: "地址",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "出生日期",
      dataIndex: "birth_date",
      key: "birth_date",
    },
    {
      title: "筛选时间",
      dataIndex: "filter_date",
      key: "filter_date",
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <span>
          <a onClick={onClickView} style={{ marginRight: 16 }}>
            查看
          </a>
          <a>删除</a>
        </span>
      ),
    },
  ]

  return (
    <Table
      loading={customer.loadLoading}
      columns={columns}
      dataSource={customer.data}
      rowKey={record => record.name}
    />
  )
}

export default observer(DataTable)
