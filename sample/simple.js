const KVS = require('../lib/sqlite-kvs.js').KVS;

(async function () {
  // open
  const db = new KVS();
  await db.open(':memory:');

  // put and get
  await db.put("neko", "nya-");
  const result = await db.get("neko");
  console.log("neko is", result);
})();


