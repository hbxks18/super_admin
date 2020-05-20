import * as React from "react"

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

    return this.props.children
  }
}

export default PageContent
