pouchdb-plugin-helper
=====================

> A helper tool for PouchDB plugins to run tests and more

For an example, see the
[pouchdb-auth](https://github.com/pouchdb/pouchdb-auth) project.

Installation
------------

```bash
npm install --save-dev pouchdb-plugin-helper
```

Update your package.json script section:
```javascript
  "scripts": {
    "helper": "./node_modules/.bin/pouchdb-plugin-helper",
    "test": "npm run helper -- test",
    // optional. The argument is the name of the browserify object on window
    "build": "npm run helper -- build Auth"
  }
```

Commands
--------

```bash
npm run helper -- build # builds a browserified version of the package
npm run helper -- coverage # run js tests with coverage
npm run helper -- js-test # run js tests
npm run helper -- lint # run linter against source files
npm run helper -- semantic-release # https://github.com/semantic-release/semantic-release
npm run helper -- test # shortcut for lint & coverage
npm run helper -- badges # generate badges for use in README.md
npm run helper -- travis # generate a relevant .travis.yml file
npm run helper -- gitignore # generate a relevant .gitignore file
```

### Notes

- The ``build`` command will generate both a minified and an unminified
  file in the dist/ subdirectory. It gets an argument: a name as used for
  on the ``window`` object.
- The ``coverage`` command will put coverage info in the ``coverage``
  subdirectory. It has a non-zero exit code if coverage isn't 100%.
- The ``js-tests`` command runs all tests in the ``test`` subdirectory.
  Files in this directory (and in this directory only!) can use ES6, with
  as a bonus ES7's async/await.
- The ``semantic-release`` command is equivalent to
  ``semantic-release pre && npm publish && semantic-release post``, with
  the advantage that there's no need to depend on the semantic-release
  tool yourself.

require() helpers
-----------------

```javascript
import {/* e.g.*/ PouchDB, should} from 'pouchdb-plugin-helper/testutils');
```
--
###
