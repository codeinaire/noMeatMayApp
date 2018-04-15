const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');
const { UserProfileInterface } = require('../interfaces');

module.exports = new GraphQLObjectType({
  name: 'ProfileType',
  description: 'This is profile for the user. It is connected to the user by the user\'s id.',

  fields: {
    id: {
      type: GraphQLID,
      description: 'This is the id of the profile created by the database.',
    },
    firstname: {
      type: GraphQLString,
      description: 'The first name of the user.',
    },
    lastname: {
      type: GraphQLString,
      description: 'The last name of the user.',
    },
    username: {
      type: GraphQLString,
      description: 'The username to login and identification in application.',
    },
    email: {
      type: GraphQLString,
      description: 'The email the user will user to sign up to the service.'
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
  interfaces: [UserProfileInterface]
});
