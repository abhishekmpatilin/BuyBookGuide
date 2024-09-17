import express from "express";
import { Book } from "../models/bookmodel.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishedYear) {
      return res.send(400).send({
        message: "Required all fields",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishedYear: req.body.publishedYear,
    };
    const book = await Book.create(newBook);

    return res.status(401).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishedYear) {
      return res.send(400).send({
        message: "Required all fields",
      });
    }
    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(400).json({ message: "Book not found" });
    }

    return res.status(200).send({
      message: "books updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: "book not found" });
    }

    return res.status(200).send({
      message: "book deleted",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
