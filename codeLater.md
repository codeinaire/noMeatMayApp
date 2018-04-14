CODE FOR USE LATER?

__THIS GOES IN profileUpdate__
`firstname: {
  type: GraphQLString
},
lastname: {
  type: GraphQLString
},
`
Local strategy returned true
Inside passport.authenticate() callback
user { id: '2f24vvg', username: 'test', password: 'password' }
Inside serializeUser callback. User id is save to the session file store here
&&&&&&&&Inside req.login() callback { id: '2f24vvg', username: 'test', password: 'password' }
req.session: {"user":"2f24vvg"}
req.user: {"id":"2f24vvg","username":"test","password":"password"}
inside graphql { id: '2f24vvg', username: 'test', password: 'password' }
this is query { operationName: 'signInUser',
  variables: { username: 'test', password: 'password' },
  query: 'mutation signInUser($username: String!, $password: String!) {\n  signInUser(username: $username, password: $password) {\n    username\n    firstname\n    lastname\n    motivation\n    __typename\n  }\n}\n' }
this is context undefined
POST /graphql 200 25.281 ms - 118



- mongo connector to search for user

// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const connectMongo = require('../database/mongoConnector');
//
// const mongo = connectMongo();
// // configure passport.js to use the local strategy, use app.use to access req object for mongo connector??
// module.exports = passport.use(new LocalStrategy(
//   async (username, password, done) => {
//     const db = await mongo;
//     const Users = db.Users;
//     let user;
//     try {
//       user = await Users.findOne(username)
//     } catch (error) {
//       console.error(`An error occured: ${error}`);
//     }
//     // here is where you make a call to the database
//     // to find the user based on their username or email address
//     // for now, we'll just pretend we found that it was users[0]
//     if(username === user.username && password === user.password) {
//       console.log('Local strategy returned true')
//       return done(null, user)
//     }
//   }
// ));

- Schema GraphQL:
```
const passport = passport.authenticate('local', (err, user, info) => {
  console.log('Inside passport.authenticate() callback');
  console.log(`req.session.passport: ${JSON.stringify(context.session.passport)}`)
  console.log(`req.user: ${JSON.stringify(context.user)}`)
  context.login(user, (err) => {
    console.log('Inside req.login() callback')
    console.log(`req.session.passport: ${JSON.stringify(context.session.passport)}`)
    console.log(`req.user: ${JSON.stringify(context.user)}`)
    return 'You were authenticated & logged in!\n';
  })
})
