import { MongoClient } from "mongodb";

//replace the <userName> and <password> including the <>
const MONGO_URL =
  "mongodb+srv://<userName>:<passoword>@from-web-to-dev.wmcfe7j.mongodb.net/?appName=from-web-to-dev";
const DB_NAME = "LibraryDB";

const client = new MongoClient(MONGO_URL);

let db;

export async function connectDB() {
  try {
    await client.connect();
    db = client.db(DB_NAME);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

export function getDB() {
  return db;
}
