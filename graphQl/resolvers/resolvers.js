module.exports = {
  user: (args, { mongo }) => {
    // console.log('context', mongo);
    const returnedPromise = mongo.then((result) => {
        // console.log('users collection', result);
        return result.insert(args).then((data) => {
          console.log('this is in second .then', data);
          console.log('this is username', data.ops[0].username);
          return data.ops[0].username;
        })
      }
    ).catch(err =>{
      console.log('error state#####', err);
    }).then((result) => {
      console.log('im called regardless', result);
      return result;
    });
    // const response = await context.Users;
    // console.log('inside resolvers',args);
    console.log('returnedPromise', returnedPromise);
    return returnedPromise;
  }
};
