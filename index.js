const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(cors());

app.post("/upload", upload.single("file"), function (req, res) {
  res.status(200).send("successfully Submitted !");
});
const directoryPath = path.join(__dirname, "images");

app.get("/api/files", (req, res) => {
  // Read the contents of the directory
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      res.status(500).json({ error: "Error reading directory" });
      return;
    }

    // Send the list of files to the client
    res.json({ files });
  });
});

app.use("/uploads", express.static("images"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
