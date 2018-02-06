const {
  GraphQLSchema,
} = require('graphql');
const MutationType = require('./mutations/mutations');
const QueryType = require('./queries/queries');

module.exports = new GraphQLSchema({
  mutation: MutationType,
  query: QueryType,
});
