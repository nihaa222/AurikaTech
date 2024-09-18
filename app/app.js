import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import TaskRoutes from "./routes.js";
import path from "path";

import cors from "cors";

dotenv.config();

const app = express();
const _dirname = path.dirname("");
const buildpath = path.join(_dirname, "../client/dist");
app.use(express.static(buildpath));
app.use(cors());

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
  res.redirect("/create");
});

mongoose.connect(process.env.MONGO).then(() => {
  console.log("Mongo connected");
  console.log("root as");
});

app.use("/create", TaskRoutes);

const PORT = process.env.PORT;
console.log(PORT);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
