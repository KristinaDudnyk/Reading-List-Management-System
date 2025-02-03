import express from "express";
import User from "../models/Userjs";

const app = express();
app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

// GET user
app.get("/auth/login", async (req, res) => {
  const { username, email } = req.body;
  const user = await User.findUser(username, email);
  res.render("readingList.ejs", { user });
});

// POST user
app.post("/auth/register", async (req, res) => {
  const { username, first_name, last_name, email } = req.body;
  const user = await User.createUser(username, first_name, last_name, email);
  res.render("readingList.ejs", { user });
});

// DELETE user
app.post("/auth/register", async (req, res) => {
  const { username, email } = req.body;
  const user = await User.deleteUser(username, email);
  res.render("books.ejs", { user });
});

// GET books
app.get("/book", async (req, res) => {

})

// POST book
app.post("/book", async (req, res) => {

})

// PUT book
app.put("/book/:id", async (req, res) => {

})


//Adding book to reading list including error handling 
app.post("/book/:readingList", async (req, res) => {

})

//Delete book from reading list
app.delete("/book", async (req, res) => {

})

//Edit reading list of read status
app.put("/readingList", async (req, res) => {

})

//Query user statistics
app.get("/user", async (req, res) => {

})
