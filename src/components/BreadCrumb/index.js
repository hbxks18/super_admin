import React from "react"
import { Link } from "react-router-dom"
import { Breadcrumb } from "antd"
import { observer } from "mobx-react"
// import styled from 'styled-components';

/**
 * 面包屑
 *
 * @param {*} props
 * @returns
 */
const BreadCrumb = props => {
  const { routes } = props
  return (
    <Breadcrumb>
      {routes.map((r, i) => {
        const isLink =
          (!r.children || r.children.every(subr => subr.hide)) &&
          i !== routes.length - 1
        let path = ""
        if (isLink) {
          path = routes
            .map(r => r.path || r.key)
            .slice(0, i + 1)
            .join("/")
        }
        return (
          <Breadcrumb.Item key={i}>
            {isLink ? <Link to={path}>{r.name}</Link> : <span>{r.name}</span>}
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}

export default observer(BreadCrumb)
