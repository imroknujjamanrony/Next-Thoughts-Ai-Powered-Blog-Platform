// // lib/mongodb.ts
// import { MongoClient, ServerApiVersion } from "mongodb";

// const uri = process.env.MONGODB_URI;
// const dbName = process.env.DB_NAME;

// if (!uri) {
//   throw new Error("❌ Please define the MONGODB_URI environment variable in .env.local");
// }

// if (!dbName) {
//   throw new Error("❌ Please define the DB_NAME environment variable in .env.local");
// }

// const options = {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// };

// // 👇 Extend the global object to allow `_mongoClientPromise`
// declare global {
//   // This allows reuse across hot reloads in development
//   var _mongoClientPromise: Promise<MongoClient> | undefined;
// }

// // Avoid reinitializing MongoClient on hot reloads in dev
// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// if (process.env.NODE_ENV === "development") {
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();
//     global._mongoClientPromise
//       .then(() => console.log("✅ Connected to MongoDB (dev)"))
//       .catch((err) => console.error("❌ MongoDB connection error:", err));
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
//   clientPromise
//     .then(() => console.log("✅ Connected to MongoDB (prod)"))
//     .catch((err) => console.error("❌ MongoDB connection error:", err));
// }

// // Export utility to get a collection
// export const getCollection = async (collectionName: string) => {
//   const client = await clientPromise;
//   return client.db(dbName).collection(collectionName);
// };

// // Collection name references
// export const collection = {
//   user_collection: "users",
//   blog_collection: "blogs",
// };

// export default clientPromise;
