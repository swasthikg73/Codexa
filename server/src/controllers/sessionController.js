import { chatClient, streamClient } from "../lib/stream.js";
import Session from "../models/Session.js";

export const createSession = async (req, res) => {
  try {
    const { problem, difficulty } = req.body;
    const userId = req.user.id;
    const clerkId = req.user.clerkId;

    if (!problem || !difficulty)
      return res
        .status(400)
        .json({ message: "Problem and Difficulty are needed" });

    //generate an Unique callId for Stream video
    const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    //create a session on DB
    const session = await Session.create({
      problem,
      difficulty,
      host: userId,
      callId,
    });

    //Create stream video call
    await streamClient.video.call("default", callId).getOrCreate({
      data: {
        created_by_id: userId,
        custom: { problem, difficulty, sessionId: session._id.toString() },
      },
    });

    //Chat messaging
    const channel = await chatClient.channel("messaging", callId, {
      name: `${problem} Session`,
      created_by_id: userId,
      members: [clerkId],
    });

    await channel.create();
    res.status(201).json({ message: "Session created successfully" });
  } catch (error) {
    console.error("Error found in create session controller: ", error.message);
    res.status(500).json("Internal server error");
  }
};

export const getActiveSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ status: "active" })
      .populate("host", "username profileImage email clerkId")
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({ sessions });
  } catch (error) {
    console.error(
      "Error found in getActive session controller: ",
      error.message,
    );
    res.status(500).json("Internal server error");
  }
};

export const getMyRecentSessions = async (req, res) => {
  try {
    const userId = req.user._id;

    //get sessions where either user is a host or participant
    const sessions = await Session.find({
      status: "completed",
      $or: [{ host: userId }, { participant: userId }],
    })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({ sessions });
  } catch (error) {
    console.error(
      "Error found in get My Recent session controller: ",
      error.message,
    );
    res.status(500).json("Internal server error");
  }
};

export const getSessionById = async (req, res) => {
  try {
    const sessionId = req.params.id;

    if (!sessionId)
      return res.status(400).json({ message: "Session Id is required" });

    const session = await Session.findById(sessionId)
      .populate("host", "username email profileImage clerkId")
      .populate("participant", "username email profileImage clerkId");

    if (!session) return res.status(404).json({ message: "Session not found" });

    res.json(200).json({ session });
  } catch (error) {
    console.error(
      "Error found in get getSessionById controller: ",
      error.message,
    );
    res.status(500).json("Internal server error");
  }
};

export const joinSession = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    const session = await Session.findById(id);
    if (!session) return res.status(404).json("Session not found");

    //Check if session is already full - has a participant
    if (session.participant)
      return json.status(404).json({ message: "Session is already full" });

    session.participant = userId;
    await session.save();

    const channel = chatClient.channel("messaging", session.callId);
    await channel.addMembers([clerkId]);

    res.status(200).json({ session });
  } catch (error) {
    console.error(
      "Error found in get getSessionById controller: ",
      error.message,
    );
    res.status(500).json("Internal server error");
  }
};

export const endSession = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const session = await Session.findById(id);
    if (!session) return res.status(404).json({ message: "Session not found" });

    //Check if the User is the host
    if (session.host.toString() != userId.toString())
      return res
        .status(403)
        .json({ message: "Only the host can close the session" });

    //Check if session is already completed
    if (session.status === "completed")
      return res.status(400).json({ message: "Session already completed" });

    session.status = "Completed";
    await session.save();

    res.status(200).json({ message: "Session ended successfully" });

    //delete Stream video Call
    const call = await streamClient.video.call("default", session.callId);
    await call.delete({ hard: true });

    //delete Stream chat channel
    const channel = await streamClient.channel("messaging", session.callId);
    await channel.delete();

    res.json(200).json({ message: "Session ended Successfully" });
  } catch (error) {
    console.error(
      "Error found in get getSessionById controller: ",
      error.message,
    );
    res.status(500).json("Internal server error");
  }
};
