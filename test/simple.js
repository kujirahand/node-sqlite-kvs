const assert = require('assert')
const KVS = require('../lib/sqlite-kvs.js').KVS;

describe('sqlite-kvs', function () {
  const db = new KVS();
  db.open(':memory:');

  describe('simple1', function () {
    it('put and get', async function () {
      await db.put('neko', 'nya-');
      const get = await db.get('neko');
      assert.strictEqual(get, 'nya-');
    });
  });
  
  describe('simple2', function () {
    it('put and get', async function () {
      await db.put('hoge', 'nya-');
      const res = await db.get('hoge');
      assert.strictEqual(res, 'nya-');

      await db.put('hoge', 'fuga')
      const up = await db.get('hoge');
      assert.strictEqual(up, 'fuga');
      
      await db.put('hoge')
      const del = await db.get('hoge');
      assert.strictEqual(del, undefined);
      
    });
  });

});

