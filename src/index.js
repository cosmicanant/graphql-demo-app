require('dotenv').config();
const { ApolloServer, ApolloError } = require('apollo-server');
const logger = require('./logger').child({ filename: __filename });
const BookApi = require('./datasources/bookService');
const AuthorApi = require('./datasources/authorService');

const { 
  typeDefs,
  mutation,
  query,
} = require('./schema');
const resolvers = require('./resolvers');


const dataSources = () => ({
  bookAPI: new BookApi(),
  authorAPI: new AuthorApi(),
});

// the function that sets up the global context for each resolver, using the req
const context = async ({ req }) => {
  // simple auth check on every request
  // const sessionId = req.headers['x-session-id']
  // const { userId } =  module.getSessionData();
  // if userId == null 
  // throw new AuthenticationError()
  const userId = (req.headers && req.headers['x-user-id']);
  // GET USER ROLES
  logger.info('request received with following headers', req.headers);
  return {
    userId,
  };
};

const server = new ApolloServer({
  typeDefs: [
    typeDefs, // schema definition and all other types such as input
    query, // query definition
    mutation, // mutations
  ],
  resolvers,
  dataSources,
  context,
  debug: true,
  formatError: (err) => {
    logger.error(err);
    if (err.message ===  'AUTH_FAILED') {
      return new ApolloError(errObj.msg, errObj.code);
    }
    return err;
  },
});
server
.listen({ port: 4090 })
.then(({ url }) => logger.debug(`🚀 app running at ${url}`));
    
const uncaughtExceptionHandler = async (err) => {
  logger.fatal(err);
  process.nextTick(() => process.exit(1));
};

const unhandledRejectionHandler = async (reason, p) => {
  logger.fatal(reason || 'Unhandled Rejection at Promise', p);
  process.nextTick(() => process.exit(1));
};

process.on('unhandledRejection', unhandledRejectionHandler);
process.on('uncaughtException', uncaughtExceptionHandler);
