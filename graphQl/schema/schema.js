const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} = require('graphql');

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'This is created when a user signs up after which they can login and use the service',

  fields: () => ({
    name: {
      type: GraphQLString,
    },
  }),
});


module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',

    fields: () => ({
      user: {
        type: UserType,
        args: {
          id: { type: GraphQLInt },
        },
      },
    }),
  }),
});
