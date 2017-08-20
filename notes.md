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
