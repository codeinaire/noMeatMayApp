const {ObjectID} =  require('mongodb');

module.exports = {
  user: async (args, mongo) => {
    // this is not sending an error message
    console.log('aoeuaoe', mongo);
    const users = await mongo;
    const Users = users.Users;
    const value = await Users.insert(args);
    console.log('value', value.ops[0].username);
    return value.ops[0].username;
    // return await mongo.then((result) => {
    //     console.log('users collection', result);
    //     const destructured = result.Users;
    //     const value = destructured.insert(args);
    //     console.log('value from db insert', destructured);
    //     return value;
    //   }
    // ).catch(err => {
    //   console.log('error state#####', err);
    // })
  },
  userFind: async (args, mongo) => {
    console.log('args', args);
    const users = await mongo;
    const Users = users.Users;
    const value = await Users.findOne(ObjectID(args.id));
    console.log('this is userFind value', value);
    return value.username;
  }
};
