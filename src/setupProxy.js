const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api', { target: 'https://localhost:59152/', secure: false, pathRewrite: {
      "/api": ""
  }}));
};