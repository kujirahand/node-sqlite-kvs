# node-sqlite-kvs
Key-Value Store for Node.js using SQLite3

# install

```
$ npm install sqlite-kvs
```

# example

```
kvs = require('sqlite-kvs');

// open
var db = kvs.open(':memory:');

// put and get
db.put("neko", "nya-", function(err) {
  db.get("neko", function (v) {
    console.log("neko is", v);
  });
});
```

# api

## db.open(path, callback)

open database

## db.get(key, callback)

get value from key.

callback is `function(value){}`

## db.put(key, value, callback)

put value to key.

callback is `function(err){}`

## db.delete(key, callback)

delete key.

callback is `function(err){}`

## db.all(callback)

get all values.

callback is `function(obj){}`. 

## db.find(prefix, callback)

find values.

callback is `function(obj){}`










