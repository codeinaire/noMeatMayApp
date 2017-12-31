const {ObjectID} =  require('mongodb');

module.exports = {
  user: async (args, mongo) => {
    console.log('aoeuaoe', mongo);
    const users = await mongo;
    const Users = users.Users;
    let value;
    try {
      value = await Users.insert(args);
    }
    catch (error) {
      console.error(`An error occurred: ${error}`);
    }
    console.log('value', value.ops[0].username);
    return { username: value.ops[0].username,};
    // return mongo.then((result) => {
    //     console.log('users collection', result);
    //
    //     const destructured = result.Users;
    //     console.log('value from db insert', destructured);
    //     const value = destructured.insert(args);
    //     console.log('value in .then', value);
    //     return value;
    //   }
    // ).catch(err => console.error('error state#####', err))
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
