const path = require('path');
const p = require('../package.json');

const logFilePath = path.resolve(__dirname, '..', 'logs', 'server.log');

module.exports = {
  app: {
    name: p.name,
    description: p.description,
  },
  env: {
    mode: process.env.NODE_ENV,
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 4080,
  },
  logger: {
  }
};
