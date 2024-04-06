/***
 * npm init -y
 * npm install express
 * ***/
const express = require("express");
const mongoose = require("mongoose");
/**********env variables **********/
const dotenv = require("dotenv");
dotenv.config();
const { DB_USER, DB_PASSWORD } = process.env;

/*************Connect to mangoose****************/

const app = express();
const dbUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.d0hufi3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(dbUrl)
  .then(function (conn) {
    console.log("connected to db");
  })
  .catch((err) => console.log(err));
/************************************/

/**********payload -> req.body**************/
app.use(express.json());

/**
 * 1. Create
 * 2. getAll
 * 3. update
 * 4. Delete
 * 5. getById
 */

const ProductRouter = require("./mvc/router/ProductRouter"); // express.Router()
const UserRouter = require("./mvc/router/UserRouter"); // express.Router()

// request -> user -> api/v1/user
app.use("/api/v1/user", UserRouter);
// request -> product -> api/v1/product
app.use("/api/v1/product", ProductRouter);

app.use(function (req, res) {
  console.log("recieved the request");
  res.status(404).json({
    message: "resource not found",
  });
});

console.log("hello");
// listening for all the http request
app.listen(3000, function () {
  console.log("Listening to port 3000");
});
