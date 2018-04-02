const { GraphQLObjectType } = require('graphql');
const { getProfile } = require('./getProfile');

module.exports = new GraphQLObjectType({
  name: 'Queries',
  description: 'All the queries available',

  fields: () => ({
    getProfile
  })
})
