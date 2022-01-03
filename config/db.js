import dotenv from "dotenv";
dotenv.config();
const MONGODB_URI = process.env.MONGO_URI;
import mongoose from "mongoose";

mongoose.connect(MONGODB_URI, {
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log(`Connected successfully ${MONGODB_URI}`);
});

mongoose.connection.on("error", (err) => {
  console.log(`Error connetion ${err}`);
});
