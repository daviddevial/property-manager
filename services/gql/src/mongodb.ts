import { Collection, MongoClient } from "mongodb";

const url = process.env.MONGO_URL || 'mongodb://root:rootpassword@localhost:27017';
const client = new MongoClient(url);
const dbName = process.env.DB_NAME || 'myProject';
const collectionName = process.env.COLLECTION_NAME || 'properties';

export async function setupMongodb(): Promise<Collection> {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    return db.collection(collectionName);
}
