const mtLogger = require('winston');
const loggerConfig = require('config').get('logger');

module.exports = mtLogger.createLogger(loggerConfig);
