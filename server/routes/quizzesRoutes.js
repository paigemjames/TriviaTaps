import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// GET all quizzes
router.get("/", async (req, res) => {
  try {
    const collection = db.collection("quizzes");
    const results = await collection.find({}).toArray();
    res.send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching quizzes");
  }
});

router.post("/:id/join", async (req, res) => {
  try {
    const quizId = decodeURIComponent(req.params.id);
    const { userEmail } = req.body;

    // Input validation
    if (!quizId || !userEmail) {
      console.log("Missing required fields");
      return res.status(400).json({
        success: false,
        message: "Quiz ID and user email are required"
      });
    }

    // Validate ObjectId format
    if (!ObjectId.isValid(quizId)) {
      console.log("Invalid quiz ID format");
      return res.status(400).json({
        success: false,
        message: "Invalid quiz ID format"
      });
    }

    // Find the quiz
    const quizCollection = db.collection("quizzes");
    const quiz = await quizCollection.findOne({ 
      _id: new ObjectId(quizId) 
    });

    if (!quiz) {
      console.log("Quiz not found");
      return res.status(404).json({
        success: false,
        message: "Quiz not found"
      });
    }

    // Check if user exists
    const participantCollection = db.collection("participants");
    const participant = await participantCollection.findOne({ userEmail });
    
    if (!participant) {
      console.log("Participant not found");
      return res.status(404).json({
        success: false,
        message: "Participant not found"
      });
    }

    // Check if user already joined
    const participantsCollection = db.collection("quiz_participants");
    const existingParticipation = await participantsCollection.findOne({
      quizId: new ObjectId(quizId),
      userEmail: userEmail
    });

    if (existingParticipation) {
      console.log("Already joined");
      return res.status(200).json({
        success: true,
        message: "Already joined this quiz",
        quizId: quizId
      });
    }

    // Record participation
    await participantsCollection.insertOne({
      quizId: new ObjectId(quizId),
      userEmail: userEmail,
      joinedAt: new Date(),
      status: 'joined',
      score: 0
    });

    console.log("Successfully joined quiz");
    res.status(200).json({
      success: true,
      message: "Successfully joined quiz",
      quizId: quizId
    });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to join quiz",
      error: error.message
    });
  }
});

// GET single quiz
router.get("/:id", async (req, res) => {
  try {
    const collection = db.collection("quizzes");
    const result = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!result) {
      res.status(404).send("Quiz not found");
      return;
    }
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching quiz");
  }
});

export default router;
