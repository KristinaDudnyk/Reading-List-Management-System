import express from "express";

const app = express();
app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.render("index.ejs");
});


// Query User database 
app.get("/user", async (req, res) => {

})

//Query book details -  return all details

app.get("/book", async (req, res) => {

})


//Create book 

app.post("/book", async (req, res) => {

})


//Editing book details
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