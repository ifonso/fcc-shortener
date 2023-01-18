import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

console.log(process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI || "")
  .then(() => {
    console.log("Database connected.");
  })
  .catch(err => {
    console.log("Error while connecting to database.");
    console.error(err);
    process.exit(1);
  })

export default mongoose.connection;