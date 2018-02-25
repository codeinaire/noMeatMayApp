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
          console.log('2) Inside passport.authenticate() callback');
          console.log('email', user.email);
          req.login(user, (err) => {
            console.log('5) &&&&&&&&Inside req.login() callback', user.email)
            console.log(`req.session: ${JSON.stringify(req.session.passport)}`)
            console.log(`req.user: ${JSON.stringify(req.user)}`);
            if(err) {
              console.error(`An error occured: ${err}`);
              return res.status(511).send(`An error occured: ${err}`)
            }
            next(user);
          })
        })(req, res, next);
      } else {
          next()
      }
    });
});
