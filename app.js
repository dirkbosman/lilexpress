const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");

const app = express();

///////////////////////////////
//// Setting Up Middleware ////
///////////////////////////////

const publicFolder = path.join(__dirname, "public");
const uploadFolder = path.join(publicFolder, "uploads");

const fileFilter = (req, file, cb) => {
  // Accept image file types only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage, fileFilter });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(publicFolder));

app.set("views", "./views");
app.set("view engine", "ejs");

//////////////////////////////
//// Exercise 1-4: Routes ////
//////////////////////////////

app.get("/", function (req, res) {
  res.send("How are you?");
});

app.get("/home", (req, res) => {
  res.sendFile("homepage.html", { root: publicFolder });
});

app.put("/home", (req, res) => {
  res.json({ good: "yep" });
});

///////////////////////////////
//// Exercise 5-10: Routes ////
///////////////////////////////

app.get("/test-ejs", function (req, res) {
  res.render("pages/test-ejs", { title: "Hey" });
});

app.get("/test-ejs2", function (req, res) {
  res.render("pages/test-ejs2", { users: ["Bob", "John", "Jane"] });
});

app.post("/test-esj3", (req, res) => {
  console.log("Name: " + req.body.name);
  console.log("Surname: " + req.body.surname);
  res.render("pages/test-ejs3");
});

app.get("/number/:id", function (req, res) {
  res.send("The number is: " + req.params.id);
});

/////////////////////////////
//// Exercise 11: Routes ////
/////////////////////////////

app.get("/upload-profile-picture", (req, res) => {
  res.sendFile("upload_profile_picture.html", { root: publicFolder });
});

// handle the upload here with multer
app.post(
  "/upload-profile-picture",
  upload.single("profile_pic"),
  (req, res) => {
    const { file, fileValidationError } = req;
    if (!file) {
      return res.status(400).send("Please upload a file");
    }
    console.log(file);
    res.send(
      `<div>You have uploaded this image: <br/> <img src="http://localhost:3000/uploads/${req.file.filename}" width="500" /></div>`
    );
  }
);

///////////////////////
//// Communication ////
/////////////////////

app.listen(3000, () => console.log("Magic Server running on port 3000"));
