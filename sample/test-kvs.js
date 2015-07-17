// test

// kvs = require('sqlite-kvs');
var kvs = require('../lib/sqlite-kvs.js');

// open
var db = kvs.open(':memory:');

// put and get
db.put("neko", "nya-", function(err) {
  db.get("neko", function (v) {
    console.log("neko is", v);
  });
});


// put and get (update)
db.put("hoge", "fuga", function (err) {
  db.get("hoge", function(v) {
    console.log("hoge is", v);
    db.put("hoge", "abcd", function(err) {
      db.get("hoge", function(v) {
        console.log("updated, hoge is", v);
      });
    });
  });
});

// put many
db.put("a1", "a")
  .put("a2", "aa")
  .put("a3", "aaa")
  .put("a4", "aaaa")
  .put("b1", "b")
  .put("b2", "bb")
  .put("b3", "bbb");

// show
setTimeout(function() {
  db.all(function(obj){
    console.log("all:", obj);
  });
  db.find("b", function(obj) {
    console.log("b:", obj);
  });
}, 100);



