const {
  GraphQLSchema,
} = require('graphql');
const MutationType = require('./mutations');
const QueryType = require('./queries');

module.exports = new GraphQLSchema({
  mutation: MutationType,
  query: QueryType,
});
