const {
  GraphQLNonNull,
  GraphQLString,
} = require('graphql');
const { ProfileType } = require('../types');

module.exports = {
  getProfile: {
    description: 'A query to get data for the profile.',
    type: ProfileType,
    resolve: (root, args, context) => {
      console.log('6) this is context in graphQl', context.req.user);
      return {
        bio: 'this is bio',
        motivation: 'this is motivation',
      };
    }
  }
}
