const { MongoClient } = require('mongodb');

const MONGO_URL = 'mongodb://localhost:27017';

module.exports = async () => {
  const db = await MongoClient.connect(MONGO_URL);
  console.log(`Now connected to: ${db}`);
  return { Users: db.collection('users') };
}
