// test
const KVS = require('../lib/sqlite-kvs.js').KVS;

async function run() {
  // open
  const db = new KVS();
  await db.open(':memory:');

  // put and get
  await db.put("neko", "nya-");
  const result = await db.get("neko");
  console.log("neko is", result);


  // put and get (update)
  await db.put("hoge", "fuga");
  console.log("hoge is",(await db.get("hoge")));

  await db.put("hoge", "abcd");
  console.log("updated hoge is",(await db.get("hoge")));

  // put object
  await db.put("array", [1,2,3,4,5]);
  console.log("array:",(await db.get("array")));


  // put many
  // put many
  await db.put("a1", "a")
          .put("a2", "aa")
          .put("a3", "aaa")
          .put("a4", "aaaa")
          .put("b1", "b")
          .put("b2", "bb")
          .put("b3", "bbb");

  // show
  setTimeout(async () => {
    await db.all()
    console.log("all:", (await db.all()));
    console.log("b:", (await db.find("b")));
  },0);
}

try{
  run();
}catch(err) {
  console.log(err);
}