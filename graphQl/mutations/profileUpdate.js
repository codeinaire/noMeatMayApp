const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');
const { ProfileType } = require('../types');

module.exports = new GraphQLObjectType({
  name: 'profileUpdate',
  description: 'A mutation to sign the user into a session.',

  fields: () => ({
    profileUpdate: {
      type: ProfileType,
      args: {
        photo: {
          type: GraphQLString,
        },
        bio: {
          type: GraphQLString,
        },
        motivation: {
          type: new GraphQLNonNull(GraphQLString),
        },
        badges: {
          type: GraphQLString,
        },
      },
      resolve: (root, args, context) => {
        console.log('6) this is context in graphQl', context.req.user);
        return {
          photo: 'this is photo',
          bio: 'this is bio',
          motivation: 'this is motivation',
          badges: 'this is badges'

        };
      }
    }
  })
})
