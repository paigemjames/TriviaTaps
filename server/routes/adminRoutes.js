import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

const router = express.Router();

// Get all admins (for admin or testing purposes only)
router.get("/", async (req, res) => {
  try {
    const collection = db.collection("admins");
    const results = await collection.find({}, { projection: { hashed_password: 0 } }).toArray();
    res.status(200).send({ message: "Admins fetched successfully", data: results });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error fetching admins" });
  }
});

// Admin Sign-Up (Register a new admin)
router.post("/signup", async (req, res) => {
  try {
    const { userEmail, password } = req.body;
    console.log('Received:', userEmail, password); // Log incoming data
    const collection = db.collection("admins");

    // Check if the Admins already exists
    const existingUser = await collection.findOne({ userEmail });
    if (existingUser) {
      return res.status(400).send({ message: "Admin already exists" });
    }

    // Validate password length
    if (password.length < 4) {
      return res.status(400).send({ message: "Password must be at least 4 characters" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword); // Log hashed password

    // Create new Admins document
    const newUser = { userEmail, hashed_password: hashedPassword };
    const result = await collection.insertOne(newUser);

    console.log('Inserted User ID:', result.insertedId); // Log the inserted ID

    res.status(201).send({ message: "Admin registered successfully", id: result.insertedId,
      success: true
     });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error registering admin" });
  }
});


// Admins Login
router.post("/login", async (req, res) => {
  try {
    const { userEmail, password } = req.body;
    const collection = db.collection("admins");

    // Find the user by email
    const user = await collection.findOne({ userEmail });
    if (!user) {
      return res.status(404).send({ message: "Admin not found" });
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

// Create a new category
router.post("/categories", async (req, res) => {
  try {
    const { name } = req.body;
    const collection = db.collection("categories");

    const existingCategory = await collection.findOne({ name });
    if (existingCategory) {
      return res.status(400).send({ message: "Category already exists" });
    }

    const result = await collection.insertOne({ name });
    res.status(201).send({ message: "Category created successfully", id: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating category");
  }
});

// Get all categories
router.get("/categories", async (req, res) => {
  try {
    const collection = db.collection("categories");
    const results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching categories");
  }
});

// Delete a category
router.delete("/categories/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = db.collection("categories");

    const result = await collection.deleteOne(query);
    if (result.deletedCount > 0) {
      res.status(200).send("Category deleted successfully");
    } else {
      res.status(404).send("Category not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting category");
  }
});

export default router;