import { Inngest } from "inngest";
import ConnectDb from "./db.js";
import User from "../models/User.js";
// Create a client to send and receive events
export const inngest = new Inngest({ id: "Codexa" });

// Create an empty array where we'll export future Inngest functions

const syncUser = inngest.createFunction(
  { id: "syncUser" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await ConnectDb();

    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    const newUser = {
      clerkId: id,
      email: email_addresses[0]?.email_address,
      username: `${first_name || ""} ${last_name || ""}`,
      profileImage: image_url,
    };
    await User.create(newUser);
  },
);

const deleteUserFromDB = inngest.createFunction(
  { id: "deleteUser" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await ConnectDb();

    const { id } = event.data;

    await User.deleteOne({ clerkId: id });
  },
);

export const functions = [syncUser, deleteUserFromDB];
