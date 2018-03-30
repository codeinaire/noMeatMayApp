const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'ProfileType',
  description: 'This is profile for the user. It is connected to the user by the user type\' id.',

  fields: {
    id: {
      type: GraphQLID,
      description: 'This is the id of the profile created by the database.',
    },
    photo: {
      type: GraphQLID,
      description: 'This is the photo url/id for the profile photo.',
    },
    bio: {
      type: GraphQLString,
      description: 'The user describes themselves.',
    },
    motivation: {
      type: GraphQLString,
      description: 'The user describes why they are taking this challenge',
    },
    badges: {
      type: GraphQLString,
      description: 'These are the badges they have gotten for their activity',
    },
  },
});
