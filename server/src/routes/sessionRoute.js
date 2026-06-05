import express from "express";
import {
  createSession,
  getActiveSessions,
  getMyRecentSessions,
  getSessionById,
  joinSession,
  endSession,
} from "../controllers/sessionController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const sessionRouter = express.Router();

sessionRouter.post("/", protectRoute, createSession);
sessionRouter.get("/active", protectRoute, getActiveSessions);
sessionRouter.get("/my-recent", protectRoute, getMyRecentSessions);

sessionRouter.get("/:id", protectRoute, getSessionById);
sessionRouter.put("/:id/join", protectRoute, joinSession);
sessionRouter.delete("/:id/end", protectRoute, endSession);

export default sessionRouter;
