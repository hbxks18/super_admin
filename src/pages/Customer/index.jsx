import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { observer } from "mobx-react"
import { Card, Button } from "antd"
import styled from "styled-components"

// import ErrorBoundary from "@/components/ErrorBoundary"

import FunctionsAndSearchToolbar from "./module/FunctionsAndSearchToolbar"
import DataTable from "./module/DataTable"
import CreateAndEditModal from "./module/CreateAndEditModal"
import { MODAL_TYPE } from "./enum"

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
  componentDidCatch(error, info) {
    // console.log(error, info)
  }
  render() {
    const { customer, base } = this.props
    return (
      <Card
        title="Default size card"
        extra={
          <Button
            onClick={() =>
              customer.setVal("modalData", {
                visible: true,
                type: MODAL_TYPE.DEFINE.CREATE,
              })
            }
          >
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
