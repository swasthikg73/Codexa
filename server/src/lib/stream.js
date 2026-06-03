import { StreamChat } from "stream-chat";
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const secretKey = ENV.STREAM_SECRET_KEY;

if (!apiKey || secretKey) {
  console.error("STREAM API key or Secret key is missing");
}
export const chatClient = StreamChat.getInstance(apiKey, secretKey);

export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUser(userData);
    return userData;
  } catch (err) {
    console.error("Error upserting Stream user :", err);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await chatClient.deleteUser(userId);
    console.log("Stream user deleted Successfully", userId);
  } catch (error) {
    console.error("Error deleting Stream user :", error);
  }
};
