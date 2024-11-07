import dotenv from 'dotenv'; // Import dotenv module
import { MongoClient, ServerApiVersion } from "mongodb";

// Load environment variables from the .env file
dotenv.config();

const uri = process.env.ATLAS_URI || "";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Asynchronous function to connect to the MongoDB server
async function connectDB() {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Return the "quizzes" database instance
    return client.db("quizzes");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit if connection fails
  }
}

// Call connectDB and get the database instance
const db = await connectDB(); // Using top-level await (since it's an ES module)

export default db;
