const { createProxyMiddleware } = require("http-proxy-middleware")
const easymock = "http://easymock.com" // 此处可以将接口代理到easy mock 地址，或者后端服务器地址

// 根据需要修改代理的接口的前缀
const proxyConf = {
  "/api": easymock
}

module.exports = app => {
  const proxys = Object.keys(proxyConf).map(uri => {
    return createProxyMiddleware(uri, {
      target: proxyConf[uri],
      changeOrigin: true
    })
  })
  app.use.apply(app, proxys)
}
