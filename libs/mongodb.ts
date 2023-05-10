import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB = process.env.MONGODB_DB

// check the MongoDB URI

if (!MONGODB_URI) {
  throw new Error('Define the MONGODB_URI environmental variable');
}

// check the MongoDB DB

if (!MONGODB_DB) {
  throw new Error('Define the MONGODB_DB environmental variable');
}

const options = {}

let client
let clientPromise

let cachedClient = null;
let cachedDb = null;

if (process.env.NODE_ENV === 'development') {

    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
      client = new MongoClient(MONGODB_URI, options)
      global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise

} else {

    // In production mode, it's best to not use a global variable.
    client = new MongoClient(MONGODB_URI, options)
    clientPromise = client.connect()

}


// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise




export async function connectToDatabase() {
  // check the cached.
  if (cachedClient && cachedDb) {
      // load from cache
      return {
          client: cachedClient,
          db: cachedDb,
      };
  }

  // Connect to cluster
  client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  let db = client.db(MONGODB_DB);

  // set cache
  cachedClient = client;
  cachedDb = db;

  return {
      client: cachedClient,
      db: cachedDb,
  };
}
