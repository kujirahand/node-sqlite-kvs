// kvs = require('sqlite-kvs');
var kvs = require('../lib/sqlite-kvs.js');

// open
var db = kvs.open(':memory:');

// put and get
db.put("neko", "nya-", function(err) {
  db.get("neko", function (err, v) {
    console.log("neko is", v);
  });
});

