require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "This is the task tracking app" }));

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const commentRoutes = require("./routes/commentRoutes");

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/tasks/:taskId/comments", commentRoutes);

app.listen(3000, () => console.log("Server is running on port 3000"));
