import express from "express";
const app = express();
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { rentalRouter } from "./routes/rentalsRouter.js";
import { userRoutes } from "./routes/userRouter.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/hanapbahay/rent", rentalRouter);
app.use("/api/hanapbahay/user", userRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

mongoose
  .connect(process.env.DB_URI, { dbName: "hanapbahay_db" })
  .then(() => console.log("MongoDB database connected!"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`app is running on http://localhost:${process.env.PORT}`);
});
