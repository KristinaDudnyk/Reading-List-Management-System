import express from "express";
import { fileURLToPath } from "node:url";
import path from "path";

import User from "../models/User.js";
import Book from "../models/Book.js";
import ReadingList from "../models/ReadingList.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

// GET user
app.get("/auth/login", async (req, res) => {
  const { username, email } = req.query;
  const user = await User.findUser(username, email);
  res.render("userPage.ejs", { user });
});
// endpoin for
app.get("/user", async (req, res) => {
  const { username, email } = req.query;
  const user = await User.findUser(username, email);
  res.status(200).json(user);
});

// POST user putUserInfoToLocalStorage
app.post("/auth/register", async (req, res) => {
  const { username, first_name, last_name, email } = req.body;
  await User.createUser(username, first_name, last_name, email);
  res.status(200).json({ username, first_name, last_name, email });
});

// DELETE user
app.delete("/delete/user/:id", async (req, res) => {
  await User.deleteUser(req.params.id);
  res.status(200).json({ msg: "successfully deleted user" });
});

// GET books
app.get("/book", async (req, res) => {
  const books = await Book.findAll();
  res.render("books.ejs", { books });
});

// POST book
app.post("/book", async (req, res) => {
  const { title, author, genre, summary, book_type, username } = req.body;
  await Book.addBook(title, author, genre, summary, book_type, username);
  res.status(200).json({ msg: "added book" });
});

app.put("/book/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, summary, book_type } = req.body;
  console.log(id, title, author, genre, summary, book_type);
  await Book.editBook(id, title, author, genre, summary, book_type);

  res.status(200).json({ msg: "updated book" });
});

//Adding book to reading list including error handling
app.post("/readinglist/add", async (req, res) => {
  try {
    const payload = req.body;
    console.log(payload);

    if (
      !payload.user_id ||
      !payload.book_id ||
      !payload.read_status ||
      !payload.want_to_read
    ) {
      return res.status(400).send({ message: "missing field" });
    }

    await ReadingList.addBooktolist(payload);

    res.status(201).send({ message: "Book added successfully" });
  } catch (error) {
    res.status(500).send({
      message: "An error occurred while adding the book",
      error: error.message,
    });
  }
});

//Delete book from reading list
app.delete("/delete/readinglist/book/:userId/:bookId", async (req, res) => {
  const userId = req.params.userId;
  const bookId = req.params.bookId;

  try {
    await ReadingList.removefromlist(userId, bookId);
    res.status(200).send({ message: "Book deleted successfully" });
  } catch {
    res.status(400).send({ message: "Failed to delete user" });
  }
});

//Edit reading list of read status
app.put("/update/readingList/:userId/:bookId", async (req, res) => {
  const userId = req.params.userId;
  const bookId = req.params.bookId;

  const readStatus = req.body.read_status;

  try {
    await ReadingList.editreadstatus(userId, bookId, readStatus);
    res.status(200).send({ message: "Book updated successfully" });
  } catch {
    res.status(400).send({ message: "Failed to update user" });
  }
});

//Query user statistics
app.get("/user", async (req, res) => {});
//Get the reading list
app.get("/readinglist", async (req, res) => {
  const readingList = await ReadingList.getReadingList();
  res.render("readingList.ejs", { readingList });
});

app.get("/homepage", async (req, res) => {
  const allowedGenres = Book.genres;
  const selectedGenre = req.query.genre || "";

  let books = await Book.findAll();

  if (selectedGenre) {
    books = books.filter(
      (book) => book.genre.toLowerCase() === selectedGenre.toLowerCase(),
    );
  }

  console.log("allowedGenres:", allowedGenres);
  console.log("books:", books);
  res.render("homepage.ejs", { allowedGenres, books, selectedGenre });
});
//Login form submission and validation logic. (Username only) Ticket:#55

export default app;
