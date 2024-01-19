const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/v1/stomp',
    createProxyMiddleware({
      target: 'https://api.jdoodle.com',
      changeOrigin: true,
      ws: true,
    })
  );
};
