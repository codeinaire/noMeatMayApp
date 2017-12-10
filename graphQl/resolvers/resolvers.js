module.exports = {
  user: async (root, data, {mongo: {Users}}) => {
      console.log('this is data', data);
      const response = await Users.insert(data);
      console.log('this is response', response);
      return Object.assign({id: response.insertedIds[0]}, data);
    }
};
