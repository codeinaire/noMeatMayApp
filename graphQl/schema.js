const {
  GraphQLSchema,
} = require('graphql');
const { MutationTypes } = require('./mutations');
const QueryType = require('./queries/queries');

module.exports = new GraphQLSchema({
  mutation: MutationTypes,
  query: QueryType,
});
