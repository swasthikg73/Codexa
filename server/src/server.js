import { ENV } from "./lib/env.js";
import express from "express";
import cors from "cors";

const app = express();

app.listen(ENV.PORT, () => {
  console.log("Server is running on PORT", ENV.PORT);
});
