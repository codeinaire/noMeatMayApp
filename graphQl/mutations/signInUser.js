const {
  GraphQLNonNull,
  GraphQLString,
} = require('graphql');
const { UserType } = require('../types');

module.exports = {
  signInUser: {
    description: 'A mutation to sign the user into a session.',
    type: UserType,
    args: {
      username: {
        type: GraphQLString,
      },
      email: {
        type: GraphQLString,
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: (root, args, context) => {
      console.log('6) this is context in graphQl', context.req.user);
      return {
        username: context.req.user.username
      };
    }
  }
}
