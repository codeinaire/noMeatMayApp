# GrapQL

- Am I using graphql only for database relating?
- GraphQL is my only endpoint to the node server, how do I set up sessions to the server via the client?
- What do I have to return via GraphQL to make sure the user is authenticated and authorised to see their content?
  - Do I have to send back the UUID??
- I need a signIn resolver... but what do I want it to do??
  - the example GraphQL backend returns the token back, but what should I send back?? Well I guess it depends where I'll be sending the user after they log in. I can send back a bunch of different information like their points, a history of shares, etc
- The GraphQl "MW" is not really middleware, but EndWare - unless there's an error. Every req ends in `graphqlHTTP()`.
  - The big different between the RESTful routes and GraphQL in Node.js is that the RESTful routes is explicit in the MW file whereas GraphQL seems to have to do that in the resolve functions depending on what field was being call in the client. The req object will still be available and therefore the user object and passport is available in the schema and resolve function.

# Client side React

- What is the purpose of the client side?

# Sessions

- When I create a session I'm going to store it in the database, will this be a middleware function before it the request gets to the graphql middleware?
  - ANSWER: I think so because graphql will not have to send anything back... well, no, it will have to send something back, the token. Will I have to do another call to the database in the graphql resolver function to get that token and send it back?? Probably?
  ```
  app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return uuid() // use UUIDs for session IDs
  },
  store: new FileStore(), ## I can do the database call here to store it.
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
  ```

- Should I encrypt the session data as well because the if I don't anyone would be able to simply use the user name... well maybe not?
  - ANSWER: Not sure. Here is where we would do it if needed:
  ```
  passport.serializeUser((user, done) => {
    // it would be done here, but I'm not sure if it is necessary.
    console.log('Inside serializeUser callback. User id is save to the session file store here')
    done(null, user.id);
  });
  ```
- How do I get the cookie to be saved in the client side application? When I use graphiQl the cookie is created upon the first request and sent back to be saved in the browser. Upon subsequent requests it is sent as the cookie header. The question is how do I get the cookie to the client application and saved in that??

# Authentication

- Where is this:
```
app.post('/login', (req, res, next) => {
  console.log('Inside POST /login callback')
  passport.authenticate('local', (err, user, info) => {
    console.log('Inside passport.authenticate() callback');
    console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
    console.log(`req.user: ${JSON.stringify(req.user)}`)
    req.login(user, (err) => {
      console.log('Inside req.login() callback')
      console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
      console.log(`req.user: ${JSON.stringify(req.user)}`)
      return res.send('You were authenticated & logged in!\n');
    })
  })(req, res, next);
})
```
code meant to go??
  - I'm not really sure. That is taking the form data from the `/login` route. Should all the passport stuff be put into the resolve function of GraphQl?
  - This is the route that calls the passport functions
