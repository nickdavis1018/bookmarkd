require("dotenv").config();
const { PORT = 3000, MONGODB_URL } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");


mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  // Connection Events
  mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error));

const BookmarkSchema = new mongoose.Schema({
        website: String,
        url: String,
      });

const Bookmark = mongoose.model("Bookmark", BookmarkSchema);

app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

app.get("/", (req, res) => {
    res.send("hello world");
  });

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));