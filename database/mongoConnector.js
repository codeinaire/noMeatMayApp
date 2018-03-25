const { MongoClient } = require('mongodb');
// put this into .env file, it was returning undefined when I did it the first time
const MONGO_URL = 'mongodb://localhost:27017/localDev';

module.exports = async () => {
  const db = await MongoClient.connect(MONGO_URL, {
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
  })

  try {
    db.collection('users').createIndex({ "username": 1 }, { unique: true });
  } catch (err) {
    console.error(`The error is ${err}`);
  }
  console.log(`Now connected to ${db.databaseName} database`);
  return { Users: db.collection('users'), }
}
