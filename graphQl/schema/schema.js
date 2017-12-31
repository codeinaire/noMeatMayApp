const {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = require('graphql');
const Resolvers = require('../resolvers/resolvers');

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
    email: {
      type: GraphQLString,
      description: 'The email the user will user to sign up to the service.'
    },
    password: {
      type: GraphQLString,
      description: 'The password used with the username to login. Must be encrypted and perhaps may have to abstract this to another function',
    },
    motivation: {
      type: GraphQLString,
      description: 'The reason why they are joining the no meat may campaign',
    },
  }),
});

const QueryType = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'All the queries available to use on this schema.',

  fields: () => ({
    username: {
      description: 'Will return a user type.',
      type: GraphQLString,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (root, args, { mongo }) => {
        return Resolvers.userFind(args, mongo);
      },
    },
    userCount: {
      type: GraphQLInt,
      resolve: async (_, args, { mongo }) => {
        const users = await mongo;
        const Users = users.Users;
        return Users.count();
      }
      // TODO how can I use this count function, I'll have to check mongodb website
        // return mongo.then(result => {
        //   console.log('Number of items in database:', result);
        //   return result.collection('users').count();
        // }).catch(err => {
        //   console.error('this is in promise', err);
        //   return err;
        // })
    },
  }),
});

const MutationType = new GraphQLObjectType({
  name: 'Mutations',
  description: 'All the mutations available to use on this schema.',

  fields: () => ({
    submitSignupDetails: {
      type: UserType,
      args: {
        username: {
          type: new GraphQLNonNull(GraphQLString),
        }
      },
      resolve(root, args, { mongo }) {
        console.log('context in resolver', mongo);
        return Resolvers.user(args, mongo)},
      }
  })
})

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
