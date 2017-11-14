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
- 2) It's a strict specification for what the tochnologiy can bo bet spread widely.
- 3) Ever changing front-end doesn't go well with the static nture of the traditional AP system.
EXAMPLE - Blog App
3 endpoints
- /user/<id>
- /users/<id>/posts
- /users/<id>/followers
There will be 3 different req/res cycles to get data for the user id, posts, and followers. This brings back redundant data (all the data in the user object, posts object, and followers object) and, if the api is customised takes time to recustomise it.

### GRAPHQL
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

# DATABASE - MONGODB

Help with getting it running: https://stackoverflow.com/questions/37096517/mongodb-error-how-can-i-solve-the-erro-in-mongodb

- The problem was an error in the spelling of a command. The error is in the documentation. I'm not sure why. When I search for `ls /lib/systemd/system | grep mongod` I find `mongodb.service` instead of what the documentation says I should find `mongod.service`. I just changed whatever command I needed to add the d and that changed everything.
- Commands:
  - START: sudo service mongodb start
  - STOP: sudo service mongodb stop
  - STATUS: sudo service mongodb status

# EXPRESS ARCHITECTURE

- [Using a loop mechanism to initialise controllers](https://medium.com/@faisalabid/node-js-and-express-architecture-edf6a254d930)

- [Express.js - how to structure application](https://stackoverflow.com/questions/5778245/expressjs-how-to-structure-an-application)
  - Middleware
    1. Any application wide middleware.
    2. All routes and assorted route middleware.
    3. Error handlers.

# EXPORTS & MODULE.EXPORTS

- https://stackoverflow.com/questions/7137397/module-exports-vs-exports-in-node-js
- http://www.hacksparrow.com/node-js-exports-vs-module-exports.html
   - module.exports has a higher priority over exports.

# NODE ES6
- Basically node.js [doesn't natively support ES6 syntax](https://stackoverflow.com/questions/30878363/import-es6-for-node), we have to install another package to use this.

# ERRORS

### NPM - cannot read property of undefined: [Solution](https://github.com/npm/npm/issues/18042)


# GLOSSARY

- λ - this is the 11th letter of the Greek alphabet. It is called lambda.

- [MOVE](http://cirw.in/blog/time-to-move-on.html) - a type of architecture for software similar to Model View Controller but instead has Models Operations Views and Events.

- [SPA](https://en.wikipedia.org/wiki/Single-page_application) - an website or web application that dynamically reloads content on one page instead of loading new pages for different content. All the required code is load on first load and no page reload happens.
