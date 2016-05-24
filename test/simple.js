var assert = require('assert')
var kvs = require('../lib/sqlite-kvs.js');

describe('sqlite-kvs', function () {

  var db = kvs.open(':memory:');

  describe('simple1', function () {
    it('put and get', function () {
      db.put('neko', 'nya-', function (err) {
        db.get('neko', function(err, v) {
          assert.equal(v, 'nya-');
        });
      });
    });
  });
  
  describe('simple2', function () {
    it('put and get', function () {
      db.put('hoge', 'nya-', function (err) {
        db.get('hoge', function(err, v) {
          assert.equal(v, 'nya-');
          db.put('hoge', 'fuga', function (err) {
            db.put('hoge', function(err,v) {
              assert.equal(v, 'fuga');
            });
          });
        });
      });
    });
  });

});

