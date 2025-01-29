import express from "express";

const app = express();
app.set("views", "views");
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  res.render("index.ejs");
});
