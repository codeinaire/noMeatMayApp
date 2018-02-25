const chai = require('chai');
const mocha = require('mocha');
const connectMongo = require('../../database/mongoConnector');

describe('Sign-up process - ', () => {
  it('tests database connection.', () => {
    const mongo = connectMongo();
    console.log(`db connect is ${mongo}`);
  })
})
