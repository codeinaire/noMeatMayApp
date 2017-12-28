const { MongoClient } = require('mongodb');
// put this into .env file, it was returning undefined when I did it the first time
const MONGO_URL = 'mongodb://localhost:27017/localDev';

module.exports = async () => {
  // return await MongoClient.connect(MONGO_URL).then(database => {
  //   console.log(`Now connected to ${database.databaseName} database`);
  // }).catch(err => {
  //   console.error(err);
  // });
  const db = await MongoClient.connect(MONGO_URL)
  console.log(`Now connected to ${db.databaseName} database`);
  return { Users: db.collection('users'), }
}
  // TODO -
  // I want to be able to send an error to tell me if the DB has connected or not, but I'm getting the following issues.
  // this returns an undefined object... not sure why
  // await MongoClient.connect(MONGO_URL).then((db) => {
  //   console.log(`Now connected to ${db.databaseName} database`);
  //   return db.collection('users');
  // }).catch((err) => {
  //   console.error({
  //         name: err.name,
  //         message: err.message,
  //       });
  // })
  // whereas this returns an unhandle promise rejection
  // (node:7992) PromiseRejectionHandledWarning: Promise rejection was handled asynchronously (rejection id: 1)
  // const db = await MongoClient.connect(MONGO_URL).then((database) => {
  //   console.log(`Now connected to ${database.databaseName} database`);
  // }).catch((err) => {
  //   console.error({
  //           name: err.name,
  //           message: err.message,
  //         });
  // });
  // return db.collection('users');
  // TODO - to use this return { Users: db.collection('users') } I have to figure out how to use this: Promise { { Users: Collection { s: [Object] } } } perhaps this is only used for the apollo-server-express
