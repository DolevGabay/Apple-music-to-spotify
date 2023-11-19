const express = require("express");
const router = express.Router();
const conn = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

router.get("/all", async (req, res) => {
  const db = await conn.getDb();
  const collection = await db.collection("transfers");

  const transfers = await collection.find({}).toArray();

  res.status(200).json(transfers);
});

router.get("/", async (req, res) => {
  const db = await conn.getDb();
  const collection = await db.collection("transfers");
  const transfer = await collection.findOne({ _id: ObjectId(req.session.transferId) });
  const transferData = transfer.transferData;
  res.status(200).json(transferData);
});

router.post("/", async (req, res) => {
  const db = await conn.getDb();
  const collection = await db.collection("transfers");

  const { transferData, source, dest } = req.body;
  const result = await collection.insertOne({ transferData, source, dest });
  req.session.transferId = result.insertedId;

  res.sendStatus(201);
});

router.delete("/", (req, res) => {
  req.session.transferData = undefined;
  res.sendStatus(200);
});

module.exports = router;
