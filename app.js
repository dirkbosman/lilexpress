const express = require("express");
const path = require("path");
const app = express();

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

app.listen(3000, () => console.log("Server running on port 3000"));
