var fs = require('fs');
var path = require('path');
var Promise = require('pouchdb/extras/promise');
var chai = require('chai');

exports.PouchDB = require('pouchdb').defaults({
  db: require('memdown')
});

var testConfig;
var home = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
var confPath = path.join(home, '.pouchdb-plugin-helper-conf.json');
try {
  testConfig = JSON.parse(fs.readFileSync(confPath, {encoding: 'utf8'}));
} catch (err) {
  testConfig = {};
}

exports.should = chai.should();

var db;

exports.setup = function () {
  db = new exports.PouchDB('test');
  return db;
};

exports.teardown = function () {
  return db.destroy();
};

exports.shouldThrowError = function (func) {
  return Promise.resolve().then(function () {
    return func();
  }).then(function () {
    exports.should.be.ok(false, 'No error thrown while it should have been');
  }).catch(function (err) {
    return err;
  });
};

exports.BASE_URL = testConfig.base_url || 'http://localhost:5984';
exports.HTTP_AUTH = testConfig.username ? {
  username: testConfig.username,
  password: testConfig.password
} : null;
