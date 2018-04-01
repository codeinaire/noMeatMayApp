const { GraphQLObjectType } = require('graphql');
const { signInUser } = require('./signInUser');
const { profileUpdate } = require('./profileUpdate');

module.exports = new GraphQLObjectType({
  name: 'Mutations',
  description: 'All the mutations available',
  
  fields: () => ({
    signInUser,
    profileUpdate
  })
})
