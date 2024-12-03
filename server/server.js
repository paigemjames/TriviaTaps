import dotenv from "dotenv";
// Load environment variables from the .env file
dotenv.config();

import express from "express";
import cors from "cors";
import quizzes from "./routes/quizzesRoutes.js";
import participants from "./routes/participantRoutes.js";
import hosts from "./routes/hostRoutes.js";
import admins from "./routes/adminRoutes.js";
import scores from "./routes/scoresRoutes.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/quizzes", quizzes);
app.use("/participants", participants)
app.use("/hosts", hosts);
app.use("/admins",admins);
app.use("/scores",scores);
// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
