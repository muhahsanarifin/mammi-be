const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const express = require("express");
// TODO: Import db
const postgreDatabase = require("./src/config/postgre");
// TODO: Import mainRouter
const mainRouter = require("./src/routes/main");
// TODO: Import morgan
const morgan = require("morgan");
// TODO:import path
// const path = require("path");

// Import fs
// const fs = require("fs");

// Import cors
// const cors = require("cors");

// Import CORS
// server.use(cors({ origin: "*" }));

// server.options("*", (req, res) => {
//   res.append("Access-Control-Allow-Origin", "*");
//   res.status(204).send();
// });
const cors = require("./src/middlewares/cors");
// TODO: Init express
const server = express();
const port = 8080;

// TODO: Import cors
server.use(cors);

postgreDatabase
  .connect()
  .then(() => {
    console.log("Database is connected");

    // TODO: Access static files
    server.use(express.static("./public"));

    // TODO: Using parser for body
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));

    // Create a write stream (in append mode)
    // let accessLogStream = fs.createWriteStream(
    //   path.join(__dirname, "access.log"),
    //   {
    //     flags: "a",
    //   }
    // );

    // Log only 4xx and 5xx response to console
    // server.use(
    //   morgan("dev", {
    //     skip: function (req, res) {
    //       return res.statusCode < 400;
    //     },
    //   })
    // );

    // TODO: Setup the logger
    // server.use(
    //   morgan("combined", {
    //     stream: accessLogStream,
    //   })
    // );

    // All requests to server is going to mainRouter
    server.use(mainRouter);

    server.listen(port, () => {
      console.log(
        `Server is running successfully, and It is listening on port ${port}`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
