import { MongoClient, MongoClientOptions } from 'mongodb'

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

let client : MongoClient
let clientPromise : Promise<MongoClient>

let cachedClient : MongoClient | null= null;
let cachedDb : any = null;

if (process.env.NODE_ENV === 'development') {

    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    let globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise: Promise<MongoClient>
    }

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(MONGODB_URI, options)
      globalWithMongo._mongoClientPromise = client.connect()
    }
    clientPromise = globalWithMongo._mongoClientPromise

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
  client = new MongoClient(MONGODB_URI as string, { useNewUrlParser: true, useUnifiedTopology: true } as MongoClientOptions);
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
