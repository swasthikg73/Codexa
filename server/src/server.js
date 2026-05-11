import { ENV } from "./lib/env.js";
import express from "express";
import cors from "cors";
import path from "path";

const app = express();

app.use(express.json());

const __dirname = path.resolve();

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "App is running up ",
  });
});

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

app.listen(ENV.PORT, () => {
  console.log("Server is running on PORT", ENV.PORT);
});
