require("dotenv").config();
const express = require("express");
const connectDBAndStartServer = require("./config/db");
const taskRoutes = require("./routes/tasksRoutes");
const authRoutes = require("./routes/authRoutes");
const { verifyToken } = require("./middlewares/authMiddleware");
const errorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/cors");
const requestLogger = require("./middlewares/requestLoggerMiddleware");

// INITIALIZE APP
const PORT = process.env.PORT;
const app = express();

// CONNECT TO SERVER
if (process.env.NODE_ENV !== "test") connectDBAndStartServer(app, PORT);

// MIDDLEWARE
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(requestLogger);
app.use("/api/auth", authRoutes);
app.use("/api/tasks", verifyToken, taskRoutes);

// ERROR HANDLER MIDDLEWARE
app.use(errorHandler);

module.exports = app;
