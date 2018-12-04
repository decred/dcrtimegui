const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  // ToDO add config file to switch between testnet and mainnet
  app.use(proxy('/api', { target: 'https://time-testnet.decred.org:59152/', secure: false, pathRewrite: {
      "/api": ""
  }}));
};