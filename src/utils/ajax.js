import axios from "axios"
import qs from "qs"
import { message } from "antd"

const handleRedirect = {
  // 需要特殊处理的状态码，例如，登录失效等
  110003: () => {
    window.location.replace("/admin/#/login")
  },
}

const ajax = axios.create({
  baseURL: "/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  },
  transformRequest: [data => qs.stringify(data)],
})

ajax.interceptors.response.use(
  response => {
    const { errno, errmsg, data } = response.data
    // 接口正常，返回 { errno, errmsg, data }
    if (response.status >= 200 && response.status < 300) {
      // 接口错误，404、500 等，返回错误
      if (errno === 0) {
        return {
          success: true,
          data,
        }
      }
      if (handleRedirect[errno]) {
        return handleRedirect[errno](data)
      }
      return message.error(errmsg || "接口错误")
    }
    return null
  },
  err => {
    // console.log(err.response);
    if (err.response) {
      const code = err.response.status
      if (code >= 500) {
        message.error("服务器打盹了~")
      }
    }
    return {
      error: err,
    }
  }
)

export default ajax
