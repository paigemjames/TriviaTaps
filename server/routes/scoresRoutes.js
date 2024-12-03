import express from "express";
import db from "../db/connection.js"; // MongoDB connection
import { ObjectId } from "mongodb";

const router = express.Router(); // Define the router

// 1. Get all scores
router.get("/", async (req, res) => {
  try {
    const collection = db.collection("scores"); // Access the "scores" collection
    const results = await collection.find({}).toArray(); // Fetch all documents
    res.status(200).json(results); // Return a JSON response with status 200
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching scores" });
  }
});
router.get("/highest", async (req, res) => {
  try {
    const collection = db.collection("scores");
    const highestScore = await collection.find().sort({ score: -1 }).limit(1).toArray(); // Sort by score in descending order and limit to 1
    if (highestScore.length === 0) {
      return res.status(404).json({ message: "No scores found" });
    }
    res.status(200).json(highestScore[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching highest score" });
  }
});

// 2. Get a single score by ID
router.get("/:id", async (req, res) => {
  try {
    const collection = db.collection("scores");
    const score = await collection.findOne({ _id: new ObjectId(req.params.id) }); // Use ObjectId for MongoDB
    if (!score) {
      return res.status(404).json({ message: "Score not found" });
    }
    res.status(200).json(score);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching score" });
  }
});

// 3. Add a new score
router.post("/", async (req, res) => {
  const { username, score } = req.body;

  if (!username || score === undefined) {
    return res.status(400).json({ message: "Username and score are required" });
  }

  try {
    const collection = db.collection("scores");
    const newScore = { username, score }; // Create the new score object
    const result = await collection.insertOne(newScore); // Insert into the collection
    res.status(201).json(result.ops[0]); // Return the inserted document
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding score" });
  }
});

// 4. Update a score by ID
router.put("/:id", async (req, res) => {
  const { username, score } = req.body;

  try {
    const collection = db.collection("scores");
    const updatedScore = await collection.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: { username, score } },
      { returnDocument: "after" }
    );
    if (!updatedScore.value) {
      return res.status(404).json({ message: "Score not found" });
    }
    res.status(200).json(updatedScore.value);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating score" });
  }
});

// 5. Delete a score by ID
router.delete("/:id", async (req, res) => {
  try {
    const collection = db.collection("scores");
    const deletedScore = await collection.findOneAndDelete({ _id: new ObjectId(req.params.id) });
    if (!deletedScore.value) {
      return res.status(404).json({ message: "Score not found" });
    }
    res.status(200).json({ message: "Score deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting score" });
  }
});

export default router; // Use ES6 export
