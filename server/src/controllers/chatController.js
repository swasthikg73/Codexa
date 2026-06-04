import { chatClient } from "../lib/stream.js";

export const getStreamToken = async (req, res) => {
  try {
    //We are using clerk Id (not MongoDb Id) because we're storing clerk ID in stream and it should match
    const token = await chatClient.createToken(req.user.clerkId);

    res.status(200).json({
      token,
      userId: req.user.clerkId,
      username: req.user.username,
      profileImage: req.user.profileImage,
    });
  } catch (error) {
    log.error("Error found in getStreamToken Controller :", error);
    res.status(500).json({ message: "Internal server Error" });
  }
};
