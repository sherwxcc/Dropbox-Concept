const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const fs = require("fs");

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", (req, res, next) => {
  console.log(req.method);
  console.log(req.url);
  next();
});

app.use(express.static("pages"));

let fileCache = {};
console.log(`FILE CACHE: ${fileCache}`);

function writeFile(fileName, fileData) {
  return new Promise((resolve, reject) => {
    fs.writeFile(`./file_uploaded/${fileName}`, fileData, (err) => {
      if (err) {
        return reject(err);
      }
      resolve(fileName);
    });
  });
}

function readFile(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(`./file_uploaded/${fileName}`, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/index.html");
});

app.get("/fileData", (req, res) => {
  fs.readdir(`./file_uploaded`, (err, files) => {
    if (err) {
      console.log(err);
    }
    console.log(files);
    res.send(files);
  });
});

app.post("/form", (req, res) => {
  console.log(req.files.file);

  fileCache[req.files.file.name] = {
    fileName: req.files.file.name,
    fileData: req.files.file.data,
  };

  console.log(`fileCache: ${fileCache}`);

  let uploadName = req.files.file.name;
  let uploadData = req.files.file.data;

  writeFile(uploadName, uploadData);
  res.redirect("/");
});

app.get("/file/:filename", (req, res) => {
  if (fileCache[req.params.filename]) {
    res.send(fileCache[req.params.filename].fileData);
    console.log("File found in cache");
  } else {
    fileCache[req.params.filename] = readFile(req.params.filename);
    console.log("File not found in cache");
  }
  fileCache[req.params.filename]
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send("File Not Found :(");
    });
});

app.get("/delete/:filename", (req, res) => {
  fs.unlink(`./file_uploaded/${req.params.filename}`, (err) => {
    if (err) {
      console.log(err);
    }
    console.log(`${req.params.filename} sucessfully deleted`);
  });
  res.redirect("/");
});

app.listen(8080, () => {
  console.log("Application listening to port 8080.");
});
