import * as React from "react"
import { Card, Button } from "antd"

class PageContent extends React.Component {
  static getDerivedStateFromError() {
    return { hasError: true }
  }

  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      errorMessage: "",
      errorInfo: "",
    }
  }

  componentDidCatch(error, info) {
    // 错误上报
    // console.log(error, info)
    this.setState({
      errorMessage: error,
      errorInfo: info,
    })
  }

  render() {
    const { title = "", extra = [], children, ...restProps } = this.props
    const { base } = restProps

    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <h2>{this.state.errorMessage.toString()}</h2>
          <pre>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </pre>
        </div>
      )
    }
    return (
      <Card title={title || base.getCurrentPageTitle} extra={extra}>
        {React.Children.map(children, child =>
          React.cloneElement(child, {
            ...restProps,
          })
        )}
      </Card>
    )
    // return this.props.children
  }
}

export default PageContent
