import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookmodel.js";
import bookRoutes from "./routes/booksRoute.js";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "https://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["content-type"],
  })
);

app.get("/", (req, res) => {
  return res.status(234).send("req recieved");
});

app.use("/books", bookRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("connected to db successfully");
    app.listen(PORT, () => {
      console.log("listing to mongoose");
    });
  })
  .catch((error) => {
    console.log(error);
  });
