import express from "express";
import User from "../models/User.js";
import Book from "../models/Book.js";

const app = express();
app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", async (req, res) => {
  res.render("index.ejs");
});

// GET user
app.get("/auth/login/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findUser(id);
  res.status(200).json({user})

});

// POST user
app.post("/auth/register", async (req, res) => {
  const { username, first_name, last_name, email } = req.body;
  await User.createUser(username, first_name, last_name, email);
  res.status(200).json({username, first_name, last_name, email})
});

// DELETE user
app.delete("/delete/user/:id", async (req, res) => {
  await User.deleteUser(req.params.id);
  res.status(200).json({ msg: 'successfully deleted user' })
});

// GET books
app.get("/book", async (req, res) => {
  const books = await Book.findAll();
  res.render("books.ejs", { books });
});

// POST book
app.post("/book", async (req, res) => {
  const { title, author, genre, summary, book_type } = req.body;
  console.log(req.body);

  const books = await Book.addBook(title, author, genre, summary, book_type);
  res.render("books.ejs", { books });
});

app.put("/book/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, summary, book_type } = req.body;
  await Book.editBook(id, title, author, genre, summary, book_type);
  res.redirect("books.ejs", { books });
});

//Adding book to reading list including error handling
app.post("/reading-list", (req, res) => {
  const newBook = req.body;

  if (!newBook.title || !newBook.author) {
    return res.status(400).send({ message: "Title and author are required" });
  }

  newBook.id = readingList.length
    ? readingList[readingList.length - 1].id + 1
    : 1;
  newBook.read = false; // Default read status

  try {
    readingList.push(newBook);
    res.status(201).send({ message: "Book added successfully", book: newBook });
  } catch (error) {
    res.status(500).send({
      message: "An error occurred while adding the book",
      error: error.message,
    });
  }
});

//Delete book from reading list
app.delete("/book", async (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = readingList.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    readingList.splice(bookIndex, 1);
    res.status(200).send({ message: "Book deleted successfully" });
  } else {
    res.status(404).send({ message: "Book not found" });
  }
});

//Edit reading list of read status
app.put("/readingList", async (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = readingList.find((book) => book.id === bookId);

  if (book) {
    book.read = req.body.read;
    res
      .status(200)
      .send({ message: "Book read status updated successfully", book });
  } else {
    res.status(404).send({ message: "Book not found" });
  }
});

//Query user statistics
app.get("/user", async (req, res) => {});

export default app;
