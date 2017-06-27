pouchdb-plugin-helper
=====================

[![Build Status](https://travis-ci.org/pouchdb/pouchdb-plugin-helper.svg?branch=master)](https://travis-ci.org/pouchdb/pouchdb-plugin-helper)
[![Dependency Status](https://david-dm.org/pouchdb/pouchdb-plugin-helper.svg)](https://david-dm.org/pouchdb/pouchdb-plugin-helper)
[![devDependency Status](https://david-dm.org/pouchdb/pouchdb-plugin-helper/dev-status.svg)](https://david-dm.org/pouchdb/pouchdb-plugin-helper#info=devDependencies)

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
npm run helper -- test # shortcut for lint & coverage
npm run helper -- badges # generate badges for use in README.md
npm run helper -- travis # generate a relevant .travis.yml file
npm run helper -- gitignore # generate a relevant .gitignore file
npm run helper -- test # runs lint and coverage
```

### Notes

- The ``build`` command will generate both a minified and an unminified
  file in the dist/ subdirectory. It gets an argument: a name as used for
  on the ``window`` object.
- The ``coverage`` command will put coverage info in the ``coverage``
  subdirectory. It has a non-zero exit code if coverage isn't 100%.
- The ``js-tests`` command runs all tests in the ``test`` subdirectory. It uses
  [mocha](https://mochajs.org/) to do so. Files in this directory (and in this
  directory only!) can use ES6, with as a bonus ES7's async & await.

require() helpers
-----------------

```javascript
import {/* e.g.*/ PouchDB, should} from 'pouchdb-plugin-helper/testutils');
```

### PouchDB
A PouchDB object that by default makes a
[memdown](https://github.com/Level/memdown) backed database.

### should
A [chai](http://chaijs.com/) object used to make assertions. E.g.:

```javascript
should.exist(undefined) // error
true.should.be.ok // no problem
```

### setup()
Makes a PouchDB database and returns it to you. Handy for use in ``mocha``'s
``beforeEach``.

### setupWithDoc()
``setup()``, with the following document in the database:
```javascript
{
  _id: 'mytest',
  test: true
}
```

Returns a promise which resolves to the following object:
```javascript
{
  db: '<the pouchdb db>',
  rev: '1-xxx'
}
```

### setupWithDocAndAttachment
``setupWithDoc``, with the following attachment added to the database:
```javascript
{
  _id: 'attachment_test',
  _attachments: {
    'text': {
      data: new Buffer('abcd', 'ascii'),
      type: 'text/plain'
    }
  }
}
```

### setupHTTP()
Similar to ``setup()``, but then on the database specified by ``BASE_URL`` and ``HTTP_AUTH`` (see below). Don't use at the same time as ``setup()``.

### teardown()
Cleans up the database created by ``setup()`` or ``setupHTTP``. Handy for use in ``mocha``'s
``afterEach``. Returns a Promise.

### shouldThrowError(func)
``func`` should be a promise, and this function returns a promise too.

This function runs ``func``, and catches any error that's thrown by it. The
function resolves into this error. If no error is thrown, it fails. An example
of how it can be used:

```javascript
const error = await shouldThrowError(async () =>
  await db.get('unexisting-doc')
);
error.status.should.equal(404);
```

### Configuration constants
Some properties of the tests can be configured. These values are available under
the names:

``BASE_URL``: defaults to 'http://localhost:5984'
``HTTP_AUTH``: defaults to null

You can change these values to your own development setup by making a file
``~/.pouchdb-plugin-helper-conf.json``, with context like this:

```javascript
{
  base_url: 'http://localhost:5985',
  username: 'test',
  password: 'test'
}
```

All keys are optional.
