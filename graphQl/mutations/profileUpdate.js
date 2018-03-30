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
        badges: {
          type: GraphQLString,
        },
        bio: {
          type: GraphQLString,
        },
        motivation: {
          type: new GraphQLNonNull(GraphQLString),
        },
        firstname: {
          type: GraphQLString
        },
        lastname: {
          type: GraphQLString
        },
        photo: {
          type: GraphQLString,
        },
      },
      resolve: (root, args, context) => {
        console.log('6) this is context in graphQl', context.req.user);
        return {
          firstname: 'this is photo',
          lastname: 'this is last name',
          bio: 'this is bio',
          motivation: 'this is motivation',
          badges: 'this is badges'

        };
      }
    }
  })
})
