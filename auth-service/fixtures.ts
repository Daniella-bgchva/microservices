import mongoose from "mongoose";
import config from "./config";
import { User } from "./models/User";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection("users");
    } catch (e) {
        console.log("Collections were not present, skipping drop...");
    }

    await User.create(
        {
            username: "user1",
            email: "user1@mail.com",
            password: "Password123!",
        },
        {
            username: "user2",
            email: "user2@mail.com",
            password: "Password123!",
        }
    );

    await db.close();
};

run().catch(console.error);