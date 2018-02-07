const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const schema = require('../graphQl/schema/schema');

const router = express.Router();

router.options('/graphql', cors(), graphqlHTTP({
  schema,
  graphiql: true,
}));

module.exports = router;
