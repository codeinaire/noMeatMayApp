const { MongoClient } = require('mongodb');
// put this into .env file, it was returning undefined when I did it the first time
const MONGO_URL = 'mongodb://localhost:27017/localDev';

module.exports = async () => {
  // return await MongoClient.connect(MONGO_URL).then(database => {
  //   console.log(`Now connected to ${database.databaseName} database`);
  // }).catch(err => {
  //   console.error(err);
  // });
  const db = await MongoClient.connect(MONGO_URL, {
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
  })

  try {
    db.collection('users').createIndex({ "email": 1 }, { unique: true });
  } catch (err) {
    console.error(`The error is ${err}`);
  }
  console.log(`Now connected to ${db.databaseName} database`);
  return { Users: db.collection('users'), }
}
