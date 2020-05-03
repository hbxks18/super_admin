import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { observer } from "mobx-react"
import { Card, Button } from "antd"
import styled from "styled-components"

import FunctionsAndSearchToolbar from "./module/FunctionsAndSearchToolbar"

@observer
class Page extends Component {
  render() {
    const { customer, base } = this.props
    console.log("Page -> render -> this.props", this.props)
    const { count, setCount } = customer
    return (
      <Card title="Default size card" extra={<Button>More</Button>}>
        <FunctionsAndSearchToolbar />
      </Card>
    )
  }
}

export default Page
