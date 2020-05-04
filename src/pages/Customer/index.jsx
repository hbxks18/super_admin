import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { observer } from "mobx-react"
import { Card, Button } from "antd"
import styled from "styled-components"

import FunctionsAndSearchToolbar from "./module/FunctionsAndSearchToolbar"
import DataTable from "./module/DataTable"

@observer
class Page extends Component {
  componentDidMount() {
    const { customer } = this.props
    customer.load()
  }
  componentWillUnmount() {
    const { customer } = this.props
    customer.clear()
  }
  render() {
    const { customer, base } = this.props
    return (
      <Card title="Default size card" extra={<Button>新建</Button>}>
        <FunctionsAndSearchToolbar customer={customer} />
        <DataTable customer={customer} />
      </Card>
    )
  }
}

export default Page
