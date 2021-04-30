// [Node.js module]
// Key-Value store using SQLite3

const SQLite3 = require('sqlite3').verbose();
const util    = require('util');

//
// private methods
const _rows2obj = (rows) => {
  const r = {};
  for (var i in rows) {
    var row = rows[i];
    var key = row.key;
    r[key] = JSON.parse(row.value);
  }
  return r;
};

//
// public class key|value database
export class KVS {
  constructor() {
    this.db = null;
  }

  //
  // close database
  close() {
    if (this.db){
      this.db.close();
    }
  };

  //
  // open database
  async open(dbpath) {
    if(this.db) {
      return this;
    }

    const db = this.db = new SQLite3.Database(dbpath);
    return db.serialize(async () => {
      await db.run(
        'CREATE TABLE IF NOT EXISTS items(' +
        ' key   TEXT PRIMARY KEY,' +
        ' value TEXT,' +
        ' ctime INTEGER,' +
        ' mtime INTEGER)');

      this.stmt_get  = db.prepare(
        'SELECT * FROM items WHERE key=? LIMIT 1'
      );
      this.stmt_get.arun = util.promisify(this.stmt_get.run);
      this.stmt_get.aget = util.promisify(this.stmt_get.get);

      this.stmt_insert = db.prepare(
        'INSERT INTO items (key,value,ctime,mtime) VALUES (?,?,?,?)'
      );
      this.stmt_insert.arun = util.promisify(this.stmt_insert.run);

      this.stmt_update = db.prepare(
        'UPDATE items SET value=?, mtime=? WHERE key=?'
      );
      this.stmt_update.arun = util.promisify(this.stmt_update.run);

      this.stmt_all = db.prepare(
        'SELECT * FROM items'
      );
      this.stmt_all.arun = util.promisify(this.stmt_all.all);

      this.stmt_find = db.prepare(
        'SELECT * FROM items WHERE key LIKE ?'
      );
      this.stmt_find.arun = util.promisify(this.stmt_find.run);

      this.stmt_delete = db.prepare(
        'DELETE FROM items WHERE key = ?'
      );
      this.stmt_delete.arun = util.promisify(this.stmt_delete.run);

    });
  };

  async get(key) {
    const row = await this.stmt_get.aget([key])
    if(!row || !row.value) {
      return undefined;
    }
    return JSON.parse(row.value);   
  };

  async put(key, value) {
    const t = Date.now();
    const value_p = JSON.stringify(value);
    const update = await this.get(key);
    if(update) {
      //
      // update content ==> value=?, mtime=?, key=?'
      await this.stmt_update.arun([value_p, t, key]);
      return value;
    }

    //
    // initial input ==> key,value,ctime,mtime
    await this.stmt_insert.arun([key, value_p, t, t]);
    return value;
  };

  async delete(key) {
    return await this.stmt_delete.arun([key]);
  };

  async all() {
    const rows = await this.stmt_all.arun([]);
    return _rows2obj(rows);
  }

  async find(prefix) {
    const rows = await this.stmt_find.arun([prefix+"%"])
    return _rows2obj(rows);
  };


}


