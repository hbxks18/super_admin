const { createProxyMiddleware } = require("http-proxy-middleware")

const proxyConf = {
  "/api": "http://localhost:3000",
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
