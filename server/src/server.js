import { ENV } from "./lib/env.js";
import express from "express";
import { serve } from "inngest/express";
import cors from "cors";
import path from "path";
import ConnectDb from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";
import { clerkMiddleware } from "@clerk/express";
import { protectRoute } from "./middleware/protectRoute.js";
import chatRouter from "./routes/chatRoute.js";
import sessionRouter from "./routes/sessionRoute.js";

const app = express();
const __dirname = path.resolve();

//Middlewares
app.use(express.json());
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true, // Credentials true meaning -> server allows a browser to have cookies on request
  }),
);
app.use(clerkMiddleware()); // This adds auth field to the req object:  req.auth()

//Routes
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRouter);
app.use("/api/session", sessionRouter);

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "App is running up ",
  });
});

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  //Any other Routes then the mentioned above in the Backend App should take the user to frontend (react)
  // In the single domain we can access both react app and backend app with this
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

const startServer = async () => {
  try {
    await ConnectDb();
    app.listen(ENV.PORT, () => {
      console.log("Server is running on PORT", ENV.PORT);
    });
  } catch (error) {
    console.error("💥 Error starting the server", error);
  }
};

startServer();
