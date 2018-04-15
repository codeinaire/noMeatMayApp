const {
  GraphQLNonNull,
  GraphQLString,
} = require('graphql');
const { ProfileType } = require('../types');

module.exports = {
  profileUpdate: {
    description: 'A mutation to sign the user into a session.',
    type: ProfileType,
    args: {
      badges: {
        type: GraphQLString,
      },
      bio: {
        type: GraphQLString,
      },
      motivation: {
        type: new GraphQLNonNull(GraphQLString),
      },
      photo: {
        type: GraphQLString,
      },
    },
    resolve: (root, args, context) => {
      console.log('6) this is context in graphQl profileupdate', context.req.user);
      return {
        bio: 'this is bio in profileUpdate',
        motivation: 'this is motivation in profileUpdate',
      };
    }
  }
}
