// test
const KVS = require('../lib/sqlite-kvs.js').KVS;

async function run() {
  let result;
  // open
  const db = new KVS();
  await db.open(':memory:');

  // put and get
  await db.put("neko", "nya-");
  result = await db.get("neko");
  console.log("neko is", result);


  // put and get (update)
  await db.put("hoge", "fuga");
  console.log("hoge is");

  result = await db.get("hoge");
  console.log("hoge is",result);

  await db.put("hoge", "abcd");

  result = await db.get("hoge");  
  console.log("updated hoge is",result);

  // put object
  await db.put("array", [1,2,3,4,5]);
  console.log("array:",(await db.get("array")));


  // put many
  // put many
  await db.put("a1", "a")
  await db.put("a2", "aa")
  await db.put("a3", "aaa")
  await db.put("a4", "aaaa")
  await db.put("b1", "b")
  await db.put("b2", "bb")
  await db.put("b3", "bbb");

  // show
  console.log("all:", (await db.all()));
  console.log("b:", (await db.find("b")));

}

try{
  run();
}catch(err) {
  console.log(err);
}