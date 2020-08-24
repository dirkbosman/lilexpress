const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

///////////////////////
//// Exercise 5-10 ////
///////////////////////

app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/test-ejs", function (req, res) {
  res.render("pages/test-ejs", { title: "Hey" });
});

app.get("/test-ejs2", function (req, res) {
  res.render("pages/test-ejs2", { users: ["Bob", "John", "Jane"] });
});

app.get("/test-ejs3", function (req, res) {
  res.render("pages/test-ejs3");
});

app.post("/submit", function (req, res) {
  console.log("Name: " + req.body.name);
  console.log("Surname: " + req.body.surname);
  // res.redirect("/");
});

app.get("/number/:id", function (req, res) {
  res.send("The number is: " + req.params.id);
});

//////////////////////
//// Exercise 1-4 ////
//////////////////////

// respond with "hello world" when a GET request is made to the homepage
app.get("/", function (req, res) {
  res.send("How are you?");
});

app.get("/home", (req, res) => {
  res.sendFile("homepage.html", { root: path.join(__dirname, "public") });
});

app.put("/home", (req, res) => {
  res.json({ good: "yep" });
});

app.listen(3000, () => console.log("Magic Server running on port 3000"));
