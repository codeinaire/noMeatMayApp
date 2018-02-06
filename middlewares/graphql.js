const passport = require('passport');
const graphqlHTTP = require('express-graphql');
const schema = require('./../graphQl/schema');

module.exports = graphqlHTTP((req, res) => {
  console.log('req body in graphqlHTTP', req.body.operationName);
    return new Promise((resolve, reject) => {
        const next = (user, info = {}) => {

            /**
             * GraphQL configuration goes here
             */

            console.log('5) inside graphql', user);
            resolve({
                schema,
                graphiql: true, // <- only enable GraphiQL in production
                context: {
                    user: user || null,
                    req: req,
                },
            });
        };
        /**
         * Try to authenticate using passport,
         * but never block the call from here.
         */
        if (req.body.operationName !== 'submitSignupDetails') {
        console.log('1) inside graphqlHTTP');
        passport.authenticate('local', (err, user, info) => {
          console.log('3) Inside passport.authenticate() callback');
          console.log('user', user.username);
          req.login(user, (err) => {
            console.log('4) &&&&&&&&Inside req.login() callback', user.username)
            console.log(`req.session: ${JSON.stringify(req.session.passport)}`)
            console.log(`req.user: ${JSON.stringify(req.user)}`);
            if(err) {
              console.error(`An error occured: ${err}`);
            }
            next(user);
          })
        })(req, res, next);
      } else {
          next()
      }
    });
});
