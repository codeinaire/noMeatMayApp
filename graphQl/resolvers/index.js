const { ObjectID } =  require('mongodb');

function testFunction() {
  console.log('');
}

module.exports = {
  count: (args, context) => {
    console.log('this is args', args);
    console.log('this is context', context.session);
    const Users = context.root.Users;
    return Users.count();
  },
  userSignUp: async (args, mongo) => {

    const users = await mongo;
    const Users = users.Users;
    let value;
    try {
      value = await Users.insert(args);
    }
    catch (error) {
      console.error(`An error occurred: ${error}`);
    }
    return {
      username: value.ops[0].username,
      firstname: value.ops[0].firstname,
      lastname: value.ops[0].lastname,
      password: value.ops[0].password,
      email: value.ops[0].email,
      motivation: value.ops[0].motivation
    };
  },
  userFind: async (args, mongo) => {
    console.log('args', args);
    const users = await mongo;
    const Users = users.Users;
    const value = await Users.findOne(ObjectID(args.id));
    console.log('this is userFind value', value);
    return value;
  }
};
