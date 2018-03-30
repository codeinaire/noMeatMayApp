const express = require('express');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const uuid = require('uuid/v4');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const authMiddleware = require('./middlewares/authentication');
const graphqlMiddleware = require('./middlewares/graphql');
const signUpMiddleware = require('./middlewares/signUp');
const connectMongo = require('./database/mongoConnector');

const mongo = connectMongo();
const app = express();
// Add mongo connector to req object to make req & connector available in graphQl middleware
app.use(async (req, res, next) => {
  console.log('connecting mongo db');
  req.root = await mongo;
  next();
});

const index = require('./routes/index');
const used = require('./routes/users');

app.use(logger('dev'));
app.use(bodyParser.json());
// express.json([options]) - this to replace the above...maybe
// app.use(express.static(root, [options])) - could be used to display pages if there is an error or broken graphql API
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware',req.body)
    console.log(req.sessionID)
    return uuid(); // use UUIDs for session IDs
  },
  secret: 'keyboard cat', // change to random gen string from .env
  store: new MongoStore({
    url: 'mongodb://localhost:27017/sessions',
    autoRemove: 'native',
    touchAfter: 24 * 3600
      }),
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    // sameSite: 'lax',
  },
}));


app.use('/', index);
app.use('/users', used);

app.use((req, res, next) => {
  console.log('inside 1st graphiql path');
  console.log('sessionID', req.sessionID);
  console.log('this is req body', req.body);

  next();
})
var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true // <-- REQUIRED backend setting
};
app.use('/signup', cors(), signUpMiddleware)

app.use('/graphql', authMiddleware, cors(corsOptions), graphqlMiddleware);

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
