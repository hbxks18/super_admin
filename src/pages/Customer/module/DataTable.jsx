import React from "react"
import { Table, Tag } from "antd"
// import { withRouter } from "react-router-dom"
// import { Result, Button } from 'antd';
import styled from "styled-components"
import { observer } from "mobx-react"

/**
 * 筛选区域
 *
 * @param {*} props
 * @returns
 */
const DataTable = props => {
  const { customer } = props
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: text => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: tags => (
        <span>
          {tags.map(tag => {
            let color = tag.length > 5 ? "geekblue" : "green"
            if (tag === "loser") {
              color = "volcano"
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <a style={{ marginRight: 16 }}>Invite {record.name}</a>
          <a>Delete</a>
        </span>
      ),
    },
  ]

  return (
    <Table
      loading={customer.loadLoading}
      columns={columns}
      dataSource={customer.data}
    />
  )
}

export default observer(DataTable)
