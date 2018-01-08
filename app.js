const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const uuid = require('uuid/v4');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const graphqlHTTP = require('express-graphql');
const schema = require('./graphQl/schema/schema');
const connectMongo = require('./database/mongoConnector');

const index = require('./routes/index');
const users = require('./routes/users');

const mongo = connectMongo();

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  req.root = mongo;
  next();
});

app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return uuid(); // use UUIDs for session IDs
  },
  secret: 'keyboard cat',
  store: new MongoStore({
    url: 'mongodb://localhost:27017/sessions',
    autoRemove: 'native',
    touchAfter: 24 * 3600
      }),
  resave: false,
  saveUninitialized: true
}))


app.use('/', index);
app.use('/users', users);
// TODO - need to fix the mongo db connector to show errors
// TODO - look into how to close the db Loc 752
app.use('/graphql', cors());
app.use('/graphql', (req, res, next) => {
  console.log('req.sessionID', req.sessionID);

  next();
}, graphqlHTTP({
  schema,
  graphiql: true,
}));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

module.exports = app;
