import dotenv from "dotenv";
// Load environment variables from the .env file
dotenv.config();

import express from "express";
import cors from "cors";
import quizzes from "./routes/quizzes.js";
import users from "./routes/users.js";
import hosts from "./routes/hostRoutes.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/quizzes", quizzes);
app.use("/users", users)
app.use("/hosts", hosts);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
