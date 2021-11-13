/******************
Dependencies 
*******************/

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const { PORT = 3000, MONGODB_URL } = process.env;

/******************
DB Connection
*******************/

mongoose.connect(MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

// Connection Events
mongoose.connection
  .on("open", () => console.log("You are connected to mongoose"))
  .on("close", () => console.log("You are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

/******************
Bookmark Model
*******************/

const BookmarkSchema = new mongoose.Schema({
  website: String,
  url: String,
});

const Bookmark = mongoose.model("Bookmark", BookmarkSchema);

/******************
Middleware 
*******************/

app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

/******************
Routes
*******************/

const app = express();

app.get("/", (req, res) => {
  res.redirect("hello world");
});

//Index Route
app.get("/bookmarks", async (req,res) => {
  try {
    res.json(await Bookmark.find({}));
  } catch (error) {
    res.status(400).json(error);
  }
})

//Delete Route
app.delete("/bookmarks/:id", async (req,res) => {
  try {
    res.json(await People.findByIdAndRemove(req.params.id));
  } catch(error) {
    res.status(400).json(error);
  }
})

//Update Route
app.put("/bookmarks/:id", async (req,res) => {
  try{
    res.json(await Bookmark.findByIdAndUpdate(req.params.id, req.body, { new: true }));
  } catch(error) {
    res.status(400).json(error);
  }
})

//Create Route
app.post("/bookmarks", async (req,res) => {
  try {
    res.json(await People.create(req.body));
  } catch(error) {
    res.status(400).json(error);
  }
})

//Show Route
app.get("/bookmarks/:id", (req,res) => {
  try {
    res.json(await Bookmark.findById(req.params.id));
  } catch(error){
    res.status(400).json(error);
  }
})

/******************
Listener
*******************/

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));