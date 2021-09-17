const { createProxyMiddleware } = require("http-proxy-middleware")
const easymock = "http://localhost:3000/"

const proxyConf = {
  "/api": easymock,
}

module.exports = app => {
  const proxys = Object.keys(proxyConf).map(uri => {
    return createProxyMiddleware(uri, {
      target: proxyConf[uri],
      changeOrigin: true,
    })
  })
  app.use.apply(app, proxys)
}
