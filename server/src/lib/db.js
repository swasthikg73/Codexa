import mongoose from "mongoose";
import { ENV } from "./env.js";

const ConnectDb = async () => {
  try {
    const conn = await mongoose.connect(ENV.DB_URL);
    console.log("✅ DB Connected Successfully: ", conn.connection.host);
  } catch (error) {
    console.log("❌ Error in DB connetion", error.message);
    process.emit(1); //0 means success, 1 means failure
  }
};

export default ConnectDb;
