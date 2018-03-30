const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'UserType',
  description: 'This is created when a user signs up. It is used to login and represent them on the service.',

  fields: {
    id: {
      type: GraphQLID,
      description: 'This is the id of the user created by the database.',
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
    password: {
      type: GraphQLString,
      description: 'The password used with the username to login. Must be encrypted and perhaps may have to abstract this to another function',
    },
    motivation: {
      type: GraphQLString,
      description: 'The reason why they are joining the no meat may campaign',
    },
  },
});
