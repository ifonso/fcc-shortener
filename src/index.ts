import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import routes from "./routes";

const PORT = process.env.PORT || 443;
const optioins: cors.CorsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
}

const app = express();

dotenv.config();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI || "")
  .then(() => {
    console.log("Database connected.");
  })
  .catch(err => {
    console.log("Error while connecting to database.");
    console.error(err);
    process.exit(1);
  })

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cors(optioins));
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server listen at: [${PORT}]`);
})