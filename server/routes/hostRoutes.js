import express from "express";
import db from "../db/connection.js";
import bcrypt from "bcrypt";

const router = express.Router();

// creates new host account in database
router.post("/signup", async (req, res) => {
  try {
    const { userName, userEmail, password, barName } = req.body;
    console.log('Received host signup:', { userName, userEmail, barName });
    
    const collection = db.collection("hosts");

    // makes sure email isnt already used
    const existingHost = await collection.findOne({ userEmail });
    if (existingHost) {
      return res.status(400).send({ message: "Host already exists" });
    }

    // makes sure password is long enough
    if (password.length < 4) {
      return res.status(400).send({ message: "Password must be at least 4 characters" });
    }

    // secures password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // saves host info to database
    const newHost = {
      userName,
      userEmail, 
      hashed_password: hashedPassword,
      barName,
      role: 'host',
      createdQuizzes: [],
      dateJoined: new Date()
    };

    const result = await collection.insertOne(newHost);
    console.log('Inserted Host ID:', result.insertedId);

    res.status(201).send({ 
      message: "Host registered successfully", 
      id: result.insertedId,
      success: true 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error registering host" });
  }
});

// logs in existing host
router.post("/login", async (req, res) => {
  try {
    const { userEmail, password } = req.body;
    const collection = db.collection("hosts");

    // checks if email exists
    const host = await collection.findOne({ userEmail });
    if (!host) {
      return res.status(404).send({ message: "Host not found" });
    }

    // checks if password is correct
    const isPasswordMatch = await bcrypt.compare(password, host.hashed_password);
    if (!isPasswordMatch) {
      return res.status(401).send({ message: "Invalid password" });
    }

    res.status(200).send({ 
      message: "Login successful",
      hostId: host._id,
      userName: host.userName,
      barName: host.barName,
      role: 'host'
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error logging in" });
  }
});

export default router;
