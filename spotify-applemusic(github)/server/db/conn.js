const { MongoClient } = require("mongodb");

const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);

let db;

async function getDb() {
  if (db) return db;

  try {
    await client.connect();

    db = client.db("spotify-applemusic");
    console.log("Connected to MongoDB Atlas");
    return db;
  } catch(e) {
    console.error('Error in connecting to DB,', e);
  }
}

module.exports = { getDb };