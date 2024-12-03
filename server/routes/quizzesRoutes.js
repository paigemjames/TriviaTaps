import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get a list of all quizzes
router.get("/", async (req, res) => {
  try {
    const collection = db.collection("quizzes");
    const results = await collection.find({}).toArray();
    res.status(200).send(results); // Returning a 200 OK response
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching quizzes");
  }
});

// Get a single quiz by ID
router.get("/:id", async (req, res) => {
  try {
    const collection = db.collection("quizzes");
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.findOne(query);

    if (!result) {
      res.status(404).send("Quiz not found"); // Returning 404 if quiz not found
    } else {
      res.status(200).send(result); // Returning the quiz details with 200 OK
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching quiz");
  }
});

// Create a new quiz
router.post("/", async (req, res) => {
  try {
    const { title, category, questions } = req.body;
    const newQuiz = { title, category, questions }; // Assuming questions field is in the request body

    const collection = db.collection("quizzes");
    const result = await collection.insertOne(newQuiz);

    res.status(201).send({ id: result.insertedId }); // Returning 201 with insertedId
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding quiz");
  }
});

// Update a quiz by ID
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    // Build the updates object dynamically based on the fields sent in the request
    const updates = {};
    if (req.body.title) updates.title = req.body.title;
    if (req.body.category) updates.category = req.body.category;
    if (req.body.questions) updates.questions = req.body.questions;

    if (Object.keys(updates).length === 0) {
      return res.status(400).send("No fields to update"); // Handle case with no updates
    }

    const collection = db.collection("quizzes");
    const result = await collection.updateOne(query, { $set: updates });

    if (result.modifiedCount > 0) {
      res.status(200).send("Quiz updated successfully");
    } else {
      res.status(404).send("Quiz not found or no changes made");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating quiz");
  }
});

// Delete a quiz by ID
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("quizzes");
    const result = await collection.deleteOne(query);

    if (result.deletedCount > 0) {
      res.status(200).send("Quiz deleted successfully");
    } else {
      res.status(404).send("Quiz not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting quiz");
  }
});

// Get quizzes by category
router.get("/category/:category", async (req, res) => {
  try {
    const collection = db.collection("quizzes");
    const results = await collection.find({ category: req.params.category }).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching quizzes by category");
  }
});

export default router;
