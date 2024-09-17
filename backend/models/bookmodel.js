import mongoose from "mongoose";
const bookschema = mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedYear: { type: Date, required: true },
  },
  {
    timeStamps: true,
  }
);

export const Book = mongoose.model("books", bookschema);
