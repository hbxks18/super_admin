import React, { Component } from "react"
// import { Result, Button } from 'antd';
import styled from "styled-components"
// import Super from "@/store/Super"

const HomeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

class SubMenu extends Component {
  componentDidMount() {
    // console.log("原来的上树")
    // console.log(Super);
  }
  render() {
    return <HomeWrapper>SubMenu</HomeWrapper>
  }
}

// console.log(SubMenu)
export default SubMenu
