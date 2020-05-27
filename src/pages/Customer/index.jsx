import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { observer } from "mobx-react"
import { Card, Button } from "antd"
import styled from "styled-components"

import PageContent from "@/components/PageContent"
import FunctionsAndSearchToolbar from "./module/FunctionsAndSearchToolbar"
import DataTable from "./module/DataTable"
import CreateAndEditModal from "./module/CreateAndEditModal"
import { MODAL_TYPE } from "./enum"

@observer
class Page extends Component {
  render() {
    // TODO:感觉此处处理比较诡异。。。之后在想想
    const { customer } = this.props
    return (
      <PageContent
        {...this.props}
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
        <FunctionsAndSearchToolbar />
        <DataTable />
        <CreateAndEditModal />
      </PageContent>
    )
  }
}

export default Page
