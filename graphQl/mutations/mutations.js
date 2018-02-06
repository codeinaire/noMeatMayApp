const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');
const UserType = require('../types');
const Resolvers = require('../resolvers/index');

module.exports = new GraphQLObjectType({
  name: 'Mutations',
  description: 'All the mutations available to use on this schema.',

  fields: () => ({
    submitSignupDetails: {
      type: UserType,
      args: {
        username: {
          type: new GraphQLNonNull(GraphQLString),
        },
        firstname: {
          type: new GraphQLNonNull(GraphQLString),
        },
        lastname: {
          type: new GraphQLNonNull(GraphQLString),
        },
        email: {
          type: new GraphQLNonNull(GraphQLString),
        },
        password: {
          type: new GraphQLNonNull(GraphQLString),
        },
        motivation: {
          type: new GraphQLNonNull(GraphQLString),
        }
      },
      resolve: (root, args, context) => {
        console.log('this is mongo', context.req.root);
        return Resolvers.userSignUp(args, context.req.root)
      },
    },
    signInUser: {
      type: UserType,
      args: {
        username: {
          type: new GraphQLNonNull(GraphQLString),
        },
        password: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (root, args, context) => {
        // console.log('this is args', args);
        console.log('6) this is context in graphQl', context.user);
        return args;
      }
    }
  })
})
