// import { requireAuth } from "@clerk/express";
import { getAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
  async (req, res, next) => {
    try {
      //   const clerkId = req.auth().userId;
      const { userId } = getAuth(req);

      if (!userId)
        return res
          .status(401)
          .json({ message: "Unauthorized - invalid token" });

      //find User form clerkId
      const user = await User.findOne({ clerkId: userId });

      if (!user) {
        res.json(404).json({ message: "User not found" });
      }

      //Attach user to req
      req.user = user;
      next();
    } catch (error) {
      console.error("Error in protect Route middleware :", error);
      res.status(500).json({ message: "Internal server Error" });
    }
  },
];
