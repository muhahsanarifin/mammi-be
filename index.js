const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const express = require("express");

// Import db
const postgreDatabase = require("./src/config/postgre");

// Import mainRouter
const mainRouter = require("./src/routes/main");

// Import morgan
const morgan = require("morgan");
// import path
const path = require("path");
// Import fs
const fs = require("fs");

//Init express
const server = express();
const port = 8080;

postgreDatabase
  .connect()
  .then(() => {
    console.log("Database is connected");

    server.listen(port, () => {
      console.log(
        `Server is running successfully, and It is listening on port ${port}`
      );
    });

    // Using parser for body
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));

    // Create a write stream (in append mode)
    let accessLogStream = fs.createWriteStream(
      path.join(__dirname, "access.log"),
      {
        flags: "a",
      }
    );

    // Log only 4xx and 5xx response to console
    server.use(
      morgan("dev", {
        skip: function (req, res) {
          return res.statusCode < 400;
        },
      })
    );

    // setup the logger
    server.use(
      morgan("combined", {
        stream: accessLogStream,
      })
    );

    // All requests to server is going to mainRouter
    server.use(mainRouter);
  })
  .catch((err) => {
    console.log(err);
  });
