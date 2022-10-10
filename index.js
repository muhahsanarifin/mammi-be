const express = require("express");

// Import db
const postgreDatabase = require("./src/config/postgre");

// Import mainRouter
const mainRouter = require("./src/routes/main");

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

    // All requests to server is going to mainRouter
    server.use(mainRouter);
  })
  .catch((err) => {
    console.log(err);
  });
