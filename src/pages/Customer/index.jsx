import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { observer } from "mobx-react"
import { Card, Button } from "antd"
import styled from "styled-components"

@observer
class Page extends Component {
  render() {
    const { customer, base } = this.props
    const { count, setCount } = customer
    return (
      <Card title="Default size card" extra={<Button>More</Button>}>
        <p>
          <Button onClick={() => setCount(count + 1)}>+</Button> {count}{" "}
          <Button onClick={() => setCount(count - 1)}>-</Button>
        </p>
        <p>base: {base.version}</p>
        <p>Card content</p>
      </Card>
    )
  }
}

export default Page
