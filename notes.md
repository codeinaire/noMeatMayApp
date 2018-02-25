# TESTING

TDD & BDD

## Mocha

PACKAGE.JSON
  - `"test": "mocha **/*.test.js"`
    - replace `**` with the name of the folder in which the test exist.

TEST FILE - NOT USING ASSERTION LIBRARY
- `const <name> = require (<name of file being tested)`
  - this will be used in the test file to call whatever function is being tested.
- `it('<should description of what function should do>', <callback>)`
  - let's us define a new test case.
  - takes two arguments:
    1) String description what test is doing.
    2) Callback function where the actually testing occurs.
    - EXAMPLE:
    ```
    it('should square a number', () => {
      var result = utils.square(2);

      if ( result != 4) {
          throw new Error('Expected 9, but got ${result}.');
      }
    });
    ```

TEST WATCHING
- `$ nodemon --exec 'npm test'`
  - this can be put into `package.json` file.

# APIs

## GRAPHQL Vs REST
### REST
- 1) Stateless servers (every request in a brand new request even if  it's a request that will seem to create a continat) and structure access to resources.
- 2) It's a strict specification for what the technologiy can bo bet spread widely.
- 3) Ever changing front-end doesn't go well with the static nature of the traditional AP system.
EXAMPLE - Blog App
3 endpoints
- /user/<id>
- /users/<id>/posts
- /users/<id>/followers
There will be 3 different req/res cycles to get data for the user id, posts, and followers. This brings back redundant data (all the data in the user object, posts object, and followers object) and, if the api is customised takes time to recustomise it.

### GRAPHQL
Design principles:
- Hierarchical - Many web connected products involve creating and manipulating hierarchies. GraphQl is structured similarly to the data it returns.
- Product-centric - Driven by the requirements of front-end engineers.
- Strong-typing - Every graphQL server defines an application-specific type system with queries executed in the context of that system. This allows validation before execution of query.
- Client-specified queries - The type system informs the client what it can consume from the server and makes the client responsible for choosing how to consume the data. This is unlike other apis in which the server determines what can be returned in the form of it's various static endpoints.
- Introspective - A graphQl server's type system can be queried by the language itself.

It consists of:
- Type system
- Query language and execution semantics
- Static validation
- Type introspection

There is only 1 API endpoint. A req has a query will all the data required for that screen such as
REQ
  ```
  query {
    User( id: ) {
      name
      posts {
        title
      }
      followers( last: ) {
        name
      }
    }
  }
  ```
RES - this is a JSON object so the keys are double quoted.
```
{
"data" {
  User {
    name: "Mary"
    posts: [
      { title: "whatever title" },
      { title: "whatever title" },
      { title: "whatever title" },
    ],
    followers: [
      { name: "Name of follower"  },
      { name: "Name of follower"  },
      { name: "Name of follower"  },
    ]
  }
}
}
```
This can simply be extracted into the page.
#### BENEFITS
- No more OVERFETCHING: gives data that isn't used by the client end
- No more UNDERFETCHING: doesn't give enough data, _the n+1 problem_
- Insightful analytics -
  - Granular details about what data is used by client
  - Enables evolution of API
  - Opportunities for performance monitoring - resolver functions are used by graphQL that can be used to monitor performance.
- Schema and Types
  - strong typing
  - schema is contract between client and server
  - front and back can work as independent teams

#### CORE CONCEPTS
Schema Definition Language (SDL) - this is the syntax of graphQL used to define the API end point which is a GraphQL Schema, otherwise known as Interface Definition Language or Schema Definition Language. Schema's most important aspects are the _fields_ and _types_. A schema is a collection of types but there are root types (query, mutation, subscription) that define the entry point for the API.

- Type System - the heart of any graphQl implementation is the type system: a description of what types of objects can be returned.
  - In the type system shorthand for non-null is "!".
    - It is possible to return null because any graphQl implementation can interact with many different services that may not be available.
    - This also allows us to return errors messages if there is a null returned.
  - Interface type - This is a list of fields, a type that acts as a connection between two separate types in GraphQl. In the Star Wars example the interface type between Human and Droid was 'Character', this contained fields common to both.
- Query -

# PRACTICAL NOTES
- The GraphQL executor accepts promises. It's okay for a RESOLVER to return a promise. If it is successfully the promise-resolved value for that query field will be returned or it'll be rejected with an error message.

## ASYNC FUNCTIONALITY

- [A good article on how to use async/await](https://tutorialzine.com/2017/07/javascript-async-await-explained)
- [Mastering Async/await Node.js](https://blog.risingstack.com/mastering-async-await-in-nodejs/) - another good article.

## AUTHENTICATION

Apparently, there is no complete authentication solution for the node.js ecosystem like there is for rails with Devise. I miss Devise. It was so easy to get it up and running. I read [this article](https://hackernoon.com/your-node-js-authentication-tutorial-is-wrong-f1a3bf831a46) about authentication and how most tutorials were getting it wrong. This is a bummer. It was written in Aug 2017, pretty recently, and they hadn't found a robust, all-in-one auth solution like Devise at that point in time.

I found a potential candidate: [ooth](https://github.com/nmaro/ooth). An [article](https://medium.com/the-ideal-system/ooth-user-accounts-for-node-js-93cfcd28ed1a) written by the creator lead me to it. However, I wouldn't want to put it into a production application because it is still very new, and he is the only contributor.

Recent tutorial on authentication with node: [scotch-io](https://github.com/scotch-io/easy-node-authentication)

The contenders for authentication are:

- [passport](http://www.passportjs.org/) - This, however, isn't a complete solution. It only provides the authentication of the user. Does it store sessions?? It would also need:
  - Rate limiting: [express-brute](https://github.com/AdamPflug/express-brute) to prevent slowing down of server by multiple password requests from the same IP address.
  - API token mechanism: [JWT](https://jwt.io/introduction/) - this could be used for sessions because each subsequent request will include the JWT and once it doesn't include that or the correct one then the session will expire. A button can be created to delete that JWT therefore cancelling the session. EXCEPT it uses cookie tokens.
    - ATTRIBUTES:
      - Stateless - the user state is never stored in server memory.f
      - Local - the JWT is stored locally.
  - Encryption - the PW needs to be adequately encrypted and decrypt. Use [bcrypt](https://www.npmjs.com/package/bcrypt)
    - There is [no need to hash the pw](https://stackoverflow.com/questions/7562675/proper-way-to-send-username-and-password-from-client-to-server) in the client as using a decent SSL cert will take care of that.
  - Sessions - [express-sessions](https://github.com/expressjs/session) - life-cycle of user using the application. Times out after certain period of time.
    - [uudi](https://github.com/kelektiv/node-uuid) - used to produce a cryptographically secure UUID (universally unique identifier) for use as a cookie.
    - [connect-mongo](https://github.com/jdesboeufs/connect-mongo) - this is to save sessions in a mongo database.
  - Confirmation - of sign-up via email.
  - Recoverable - of password via email. Here's a tutorial for it: [Password Reset](https://www.codementor.io/olatundegaruba/password-reset-using-jwt-ag2pmlck0). This token should time out after certain period of time.
  - Registrable - of the account. I already have this feature with the graphQL stuff.
  - Trackable? - sign in count, timestamp, IP address.
  - Lockable? - freeze account after certain number of failed sign-ins.
  - Validateable - validate email and password.
- [feathers/authentication](https://github.com/feathersjs/authentication) - it looks kind of like an extension of express, but allows for adding different services on top of it. I'm not sure how that would work with graphQL or on top of anything else I want to build into the app.

Authentication as a service
- [Auth0](https://auth0.com/) - this could be a good service to use. There's a free level and an Open Source program level.
- [Firebase Auth](https://firebase.google.com/products/auth/) - this is a google product and there is a free level. Might be better to use this than Auth0.

Other
- [OAuth](https://oauth.net/code/)- OAuth allows notifying a resource provider (e.g. Facebook) that the resource owner (e.g. you) grants permission to a third-party (e.g. a Facebook Application) access to their information (e.g. the list of your friends).
- [graphql-auth](https://www.npmjs.com/package/graphql-auth) - a middleware for auth that can be used with other auth middleware like passport. Not something I wanted to use because it wasn't that clear to me as to how I would integrate Passport and I think I would've needed to install other modules. Code for it [here](https://github.com/kkemple/graphql-auth-examples)
- [Scaphold Auth](https://scaphold.io/community/blog/authentication-in-graphql/) - an article about a top level view of authentication and an example of such using a graphql framework.

### Authentication workflow

Client
1) Client - `/signin` page with `<form>username & password</form>`
2) Client - submit > `mutation signInUser(username & password)` > node server
Server
3) Server -
  - REST - `POST /signin` route
  - GraphQL - `signIn` field
4) Pre-configured passport strategy - this has been defined before `const app = express()` & is called from within the field or route
  - REST - defined in MW file, but can be separated out.
  - GraphQl - defined in the resolve function
  - Returns `done(null, user)`.
5) Passport.authenticate - the callback function is initiated (does that mean it returns a promise?). The user object isn't attached to the req object at this point.
6) Serialization - `passport.serializeUser()` callback is initiated and the User Id is save here - this can come from the MongoDB ObjectID. It's saved in the session store in MongoDB.
  - REST - defined in MW file, but can be separated out.
  - GraphQl - defined in the resolve file.
7) Login - `req.login()` callback is initiased and the session for this user and can be accessed on the req object. This is when something is returned. A message perhaps.

### Authentication with Passport

I found [this](https://github.com/jessedvrs/graphql-passport-example) great Node.js example of using GraphQL and Passport.js. I'm very relieved that I found this otherwise I think I would've used a GraphQL framework instead of the base GraphQL or I could've eventually figured it out with a lot of frustrating trial and error. This example is exactly what I was looking for. I'm learning a lot from it already by just looking at the code. I'm going to have to refactor my server code significantly. The author has broken out a bunch of the middlewares into different files and also the graphQL parts into different files. This make everything so much clearer and easier to understand. I only broke out the resolvers, but I can also break out the schema as well into queries and types. I can break that out into queries, mutations, and types.

He was calling the entire folder contents itself into a module. I'm curious about this. I wonder if this is a pattern for building frameworks? When doing this he put this `export { default as CakeType } from './CakeType';` into an `index.js` file.

## DATABASE - MONGODB

Help with getting it running: https://stackoverflow.com/questions/37096517/mongodb-error-how-can-i-solve-the-erro-in-mongodb

- The problem was an error in the spelling of a command. The error is in the documentation. I'm not sure why. When I search for `ls /lib/systemd/system | grep mongod` I find `mongodb.service` instead of what the documentation says I should find `mongod.service`. I just changed whatever command I needed to add the d and that changed everything.
- Commands:
  - START: sudo service mongodb start
  - STOP: sudo service mongodb stop
    - [This](https://askubuntu.com/questions/677066/how-can-i-stop-mongodb-from-starting-on-system-boot#677108) is how to stop MongoDB from starting on bootup.
  - STATUS: sudo service mongodb status
  - This is how to check out the log: `/var/log/mongodb/mongod.log`, I opened it up it nano

- MONGOD - To be able to use the command `$ mongod` I had to create a folder in the root dir called `/data/db`. When I used `$ mongod` I accessed the databases in that folder instead of using the commands above. Actually, I have to use the commands above to stop the mongodb process from running otherwise I wouldn't be able to use the command here.

- MONGO - The command to run the CLI for mongoDB is `$ mongo`. There are a few good commands to use to explore databases in the CLI. They are:
  - `> show dbs`
  - `> use <db name>` - this will switch the CLI to use whatever db stated.
  - `> db.getCollection('users').find({ <key>: <value> })` - to find an item.
    - I don't know why but I'm unable to use this: `> db.localDev.find({ <key>: <value> })`

- ERROR - I now understand what this error means: `(node:10861) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 2): MongoError: query selector must be an object`. The database gave me an error because I didn't use an object to search for a document in the collection. However, when I took away the try/catch block it spat out this error. This is because there was no error resolution for the promise that errored out. I did just get another of these warnings and then the actual error. That must've come from the graphql feedback maybe??

## EXPRESS ARCHITECTURE

- [Using a loop mechanism to initialise controllers](https://medium.com/@faisalabid/node-js-and-express-architecture-edf6a254d930)

- [Express.js - how to structure application](https://stackoverflow.com/questions/5778245/expressjs-how-to-structure-an-application)
  - Middleware
    1. Any application wide middleware.
    2. All routes and assorted route middleware.
    3. Error handlers.

## EXPORTS & MODULE.EXPORTS

- https://stackoverflow.com/questions/7137397/module-exports-vs-exports-in-node-js
- http://www.hacksparrow.com/node-js-exports-vs-module-exports.html
   - module.exports has a higher priority over exports.

## MIDDLEWARE

- [app.use](https://stackoverflow.com/questions/11321635/nodejs-express-what-is-app-use) - this is the node command to add a layer to the middleware functionality. It can apply to a specific route `app.use('/', index);` or it can apply to every request that comes in.

## NODE ES6
   - Basically node.js [doesn't natively support ES6 syntax](https://stackoverflow.com/questions/30878363/import-es6-for-node), we have to install another package to use this. This isn't true. I'm using node v8 and there is native support for it.


## SECURITY

- [Secure JS Applications](https://www.youtube.com/watch?v=BeKMbTSm7x8)


## MARKDOWN

- [Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

## RESTful APIs

- The [`options`](http://zacstewart.com/2012/04/14/http-options-method.html) header is used to find out what HTTP methods are accepted by the server.
- The [`204 No Content`](https://benramsey.com/blog/2008/05/http-status-204-no-content-and-205-reset-content/) response is used to indicate a successful request was processed but there is no content in the body. This could be the case for deleting a persisted object or perhaps for signing out a user.
# ERRORS

### NPM - cannot read property of undefined: [Solution](https://github.com/npm/npm/issues/18042)

### ESLint - it'd want to use the eslint-jest plugin. SOLUTION was to move it outside of the same folder in which the react folder was in.

### CONNECTING TO DB - I was having trouble with connecting to the database. It was basically because I didn't know how to use Promises. SOLUTION - MDN [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) docs helped. Now I'm having a problem returning the value back to the grapiql.

### Returning the value of a mutation - I was having trouble returning a value of a mutation. It would always return null even if the write to the database was successful. I didn't know why. I put the return value in an object and that worked. Like so `return { username: value.ops[0].username };`.

### Pass req & db object into graphql schema - [this](https://stackoverflow.com/questions/12518132/modifying-express-js-request-object) show how to attach any object to the req object via root.

### [EXPORT/IMPORT](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) issues - when using `export default <object/function/class>`, I don't need to deconstruct it in the file. I can just import it as whatever name I want in the module I want to use it.

### Passing through Username & Password to Passport - I was very confused about what to do. I eventually figured out that it had to be put into the body and didn't know how to pass it in via the graphql query from the Apollo client, however, I just had to do this: `usernameField: 'variables[username]', passwordField: 'variables[password]'`. I tried this before, but didn't do it the correct way. I did `variables.username`, obvious not right.

# GLOSSARY

- λ - this is the 11th letter of the Greek alphabet. It is called lambda.

- [MOVE](http://cirw.in/blog/time-to-move-on.html) - a type of architecture for software similar to Model View Controller but instead has Models Operations Views and Events.

- [SPA](https://en.wikipedia.org/wiki/Single-page_application) - an website or web application that dynamically reloads content on one page instead of loading new pages for different content. All the required code is load on first load and no page reload happens.

- [Serialization](https://en.wikipedia.org/wiki/Serialization) - this is when a data structure is transformed into a format that can be persisted or transmitted across a network.

## HTTP Request Headers

- **Accept** - this indicates to the server what content the client can accept. Usually, a number of different content type is sent and the server will choose which to respond with and make it know to the client in the response with `Content-Type` header. This header will list different types depending on what is requested such as image o video
- **Accept-Encoding** - this is the type of compression algorithm the client can accept. It's responded with `Content-Encoding`
- **Accept-Language** - this lets the server know what language the client can accept.
- **Access-Control-Request-Headers** - this used for preflight request (a request before the actual request to check if the CORS protocol is understood) to let the server know what HTTP headers will be used on the actual request.
- **Access-Control-Request-Method** - same as above but to let the server know what HTTP method will be used.
- **Connection** - this lets the server know if it'll keep the network connection open after the current transaction has finished. `keep-alive` lets the server know to allow subsequent requests to the same server.
- **DNT** - this is the Do Not Track header, letting the server know if the client wants privacy or personalised content.
- **Host** - this is the domain name of the server and (optionally) the port.
- **Origin** - this indicates the domain origin of the fetch request
- **User-Agent** - this is information about the requesting OS, application type, software vendor and version.

## Response Headers

- **Access-Control-Allow-Headers** - what headers can be used during the actual request.
- **Access-Control-Allow-Method** - the response to **Access-Control-Request-Method** to indicate to the client what HTTP methods are allowed.
- **Access-Control-Allow-Origin** - indicates if the response can be shared with the given origin. `*` is wildcard and means can be shared with any origin.
- **Content-Length** - indicates the size of the entity-body send to the client.
- **Content-Encoding** - lets the client know what compression algorithm was used on the body, if any.
- **Content-Type** - This lets the client know the media type of the resource. Browsers may MIME sniff and not follow the header. This can be turned off by `X-Content-Type-Options: nosniff`
- **Set-Cookie** - This is used to send cookies to the client.
- **Vary** - something about future headers and whether a cached response can be used rather than requesting a fresh one.
- **X-Powered-By** - this is a non-standard header and indicates the technology used by the application.
