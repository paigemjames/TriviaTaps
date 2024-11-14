import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

const router = express.Router();

// Get all users (for admin or testing purposes only)
router.get("/", async (req, res) => {
  try {
    const collection = db.collection("users");
    const results = await collection.find({}, { projection: { hashed_password: 0 } }).toArray();
    res.status(200).send({ message: "Users fetched successfully", data: results });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error fetching users" });
  }
});

// User Sign-Up (Register a new user)
router.post("/signup", async (req, res) => {
  try {
    const { userEmail, password } = req.body;
    console.log('Received:', userEmail, password); // Log incoming data
    const collection = db.collection("users");

    // Check if the user already exists
    const existingUser = await collection.findOne({ userEmail });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    // Validate password length
    if (password.length < 4) {
      return res.status(400).send({ message: "Password must be at least 4 characters" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword); // Log hashed password

    // Create new user document
    const newUser = { userEmail, hashed_password: hashedPassword };
    const result = await collection.insertOne(newUser);

    console.log('Inserted User ID:', result.insertedId); // Log the inserted ID

    res.status(201).send({ message: "User registered successfully", id: result.insertedId,
      success: true
     });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error registering user" });
  }
});


// User Login
router.post("/login", async (req, res) => {
  try {
    const { userEmail, password } = req.body;
    const collection = db.collection("users");

    // Find the user by email
    const user = await collection.findOne({ userEmail });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.hashed_password);
    if (!isPasswordMatch) {
      return res.status(401).send({ message: "Invalid password" });
    }

    res.status(200).send({ message: "Login successful", userType: user.userType });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error logging in" });
  }
});

export default router;
