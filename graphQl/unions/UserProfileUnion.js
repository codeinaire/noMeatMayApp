const {
  GraphQLUnionType
} = require('graphql');
const {
  UserType,
  ProfileType
} = require('../types');

module.exports = new GraphQLUnionType({
  name: 'UserProfile',
  description: 'A union to get fields from UserType and ProfileType',
  types: [UserType, ProfileType],
  resolveType() {

    return {
      ProfileType,
      UserType
    }
  }
})
