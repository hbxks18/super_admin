import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { observer } from "mobx-react"
import { Card, Button } from "antd"
import styled from "styled-components"

import FunctionsAndSearchToolbar from "./module/FunctionsAndSearchToolbar"
import DataTable from "./module/DataTable"
import CreateAndEditModal from "./module/CreateAndEditModal"

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
      <Card
        title="Default size card"
        extra={
          <Button onClick={() => customer.setVal("modalData", true, "visible")}>
            新建
          </Button>
        }
      >
        <FunctionsAndSearchToolbar customer={customer} />
        <DataTable customer={customer} />
        <CreateAndEditModal customer={customer} />
      </Card>
    )
  }
}

export default Page
