const {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
} = require('graphql');
/**
 * Shorthand
 *
 * type User {
 *  id: ID!
 *  name: String
 *  username: String
 *  password: Password
 * }
 *
 * type
*/
const UserType = new GraphQLObjectType({
  name: 'UserType',
  description: 'This is created when a user signs up. It is used to login and represent them on the service.',

  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'This is the id of the user created by the database.',
    },
    name: {
      type: GraphQLString,
      description: 'The first and last name of the user.',
    },
    username: {
      type: GraphQLString,
      description: 'The username to login and identification in application.',
    },
    password: {
      type: GraphQLString,
      description: 'The password used with the username to login. Must be encrypted and perhaps may have to abstract this to another function',
    },
  }),
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'All the queries available to use on this schema.',

  fields: () => ({
    user: {
      description: 'Will return a user type.',
      type: UserType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: () => ({
        id: 0,
        name: 'John Stewart',
        username: 'whatever',
        password: 'heyyeah',
      }),
    },
  }),
});


module.exports = new GraphQLSchema({
  query: QueryType,
});
