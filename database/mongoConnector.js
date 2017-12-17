const { MongoClient, assert } = require('mongodb');

const MONGO_URL = 'mongodb://localhost:27017/localDev';

module.exports = async () => {
  const db = await MongoClient.connect(MONGO_URL);
  console.log(`Now connected to: ${db.databaseName}`);
  // const dbv = async () => await Users.collection.insertOne({name: 'you work'})
  // console.log(dbv);
  // console.log('database', Users);
  return db.collection('users');
}
