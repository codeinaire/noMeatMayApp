const {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');
const { UserType } = require('../types');
const Resolvers = require('../resolvers');

module.exports = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'All the queries available to use on this schema.',

  fields: () => ({
    userFind: {
      description: 'Will return a user type.',
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (root, args, { mongo }) => {
        return Resolvers.userFind(args, mongo);
      },
    },
    userCount: {
      type: GraphQLInt,
      resolve: async (root, args, context) => {
        console.log('this is in schema', context.passport);
        // const Users = context.root.Users;
        // return Users.count();
        return Resolvers.count(args, context);
      }
      // TODO how can I use this count function, I'll have to check mongodb website
        // return mongo.then(result => {
        //   console.log('Number of items in database:', result);
        //   return result.collection('users').count();
        // }).catch(err => {
        //   console.error('this is in promise', err);
        //   return err;
        // })
    },
  }),
});
