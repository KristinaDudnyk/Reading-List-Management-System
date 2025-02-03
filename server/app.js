import express from "express";

const app = express();
app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.render("index.ejs");
});


// Query User database 
app.get("/", async (req, res) => {

})

//Query book details -  return all details

app.get("/", async (req, res) => {

})


//Create book details

app.post("/", async (req, res) => {

})


//Editing book details
app.post("/", async (req, res) => {

})


//Adding book to reading list including error handling 
app.post("/", async (req, res) => {

})

//Delete book from reading list
app.delete("/", async (req, res) => {

})

//Edit reading list of read status
app.post("/", async (req, res) => {

})

//Query user statistics
app.get("/", async (req, res) => {

})