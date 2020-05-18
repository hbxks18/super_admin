import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
// import * as Sentry from "@sentry/browser"
// 前端监控
// process.env.NODE_ENV === "production" &&
//   Sentry.init({
//     dsn:
//       "https://8703dee7bb8b46c794ad0425aafa24d9@o393025.ingest.sentry.io/5241525",
//   })

// React.StrictMode 不开启校验
ReactDOM.render(<App />, document.getElementById("root"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
