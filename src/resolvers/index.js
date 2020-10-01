const Query = require('./queryResolvers');
const Mutation = require('./mutationResolvers');
const typeResolvers = require('./typeResolvers');

module.exports = {
  Query,
  ...typeResolvers,
  Mutation,
};
