import express from "express";
import dotenv from "dotenv";
import mainRoutes from "./routes/mainRoute.js";

// Initialize dotenv
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Disable x-powered-by header in response so that others can't know that we are using express (Security through obscurity)
app.disable("x-powered-by");

app.use("/api", mainRoutes);

app.use("/health", (req, res) => {
  res.status(200).json({
    success: "server is running",
  });
});

// Handle all other routes that are not defined
app.use("/*", (req, res) => {
  res.status(400).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
