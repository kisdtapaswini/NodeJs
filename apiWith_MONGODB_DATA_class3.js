/***
 * npm init -y
 * npm install express
 * ***/

const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const { DB_USER, DB_PASSWORD } = process.env;

const app = express();
// reading the content

/*****connect to the DB******/
//const dbUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.01kltpg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const dbUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.d0hufi3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(dbUrl)
  .then(function (conn) {
    console.log("connected to db");
  })
  .catch((err) => console.log(err));
// connect with Database

/*************userSchema****************/
let userSchemaObject = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
    minLength: 8,
  },
  confirmPassword: {
    type: String,
    require: true,
    minLength: 8,
    validate: function () {
      return this.password == this.confirmPassword;
    },
  },
  // },
  // createAt: {
  //     type: Date,
  //     default: Date.now()
  // },
  role: {
    type: String,
    default: "user",
  },
};
const userSchema = new mongoose.Schema(userSchemaObject);
const roles = ["admin", "buyer", "seller"];

userSchema.pre("save", function () {
  this.confirmPassword = undefined;
});
userSchema.pre("save", function (next) {
  let isPresent = roles.find((cRole) => {
    return cRole == this.role;
  });
  if (isPresent == undefined) {
    const error = new Error("role is invalid");
    next(error);
  }
});
// USERMODEL
const UserModel = mongoose.model("User_Model", userSchema);

/***************handlers**********************/
const getUser = async (req, res) => {
  try {
    // template -> get the data from req.params
    const id = req.params.id;
    const user = await UserModel.findById(id);
    // if user is present -> send the resp
    if (user) {
      user.password = undefined;
      user.__v = undefined;
      if (user.confirmPassword) {
        user.confirmPassword = undefined;
      }
      res.status(200).json({
        message: user,
      });
      // if it's not there then send user not found
    } else {
      res.status(404).json({
        message: "did not get the user",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Internal server error",
      message: err.message,
    });
  }
};
const getAllUser = async (req, res) => {
  try {
    const user = await UserModel.find(); //get all user, find is kind of an iterator, if w epass any filer logic it filters data and
    //sen dback if not then the whole list it send back.

    // if user is present -> send the resp
    if (user.length != 0) {
      res.status(200).json({
        message: user,
      });
      // if it's not there then send user not found
    } else {
      res.status(404).json({
        message: "did not get any user",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Internal server error",
      message: err.message,
    });
  }
};
const createUser = async (req, res) => {
  try {
    // id
    const userDetails = req.body; // Get the data for the new user
    const user = await UserModel.create(userDetails); // Create the user[craete is a BUILT IN method from Mangoose to work upon anymodel]
    res.status(201).json({
      message: "user created",
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      status: "Internal server error",
      message: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const objToUpdate = req.body;
    const user = await UserModel.findByIdAndUpdate(id, objToUpdate, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      message: "user is updated",
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      status: "Internal server error",
      message: err.message,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    let { id } = req.params;
    const user = await UserModel.findByIdAndDelete(id);
    if (user === null) {
      res.status(404).json({
        status: "sucess",
        message: "user does not exist",
      });
    } else {
      res.status(200).json({
        status: "sucess",
        message: "user is deleted",
        user: user,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Internal server error",
      message: err.message,
    });
  }
};
const sanityMiddleWare = (req, res, next) => {
  try {
    let body = req.body;
    let isEmpty = Object.keys(body).length == 0;
    if (isEmpty) {
      res.status(400).json({
        status: "failure",
        message: "req.body is empty",
      });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({
      status: "failure",
      message: "Internal Server error",
    });
  }
};
app.use(express.json());
//1. create a user
app.post("/api/user", sanityMiddleWare, createUser); // profile page -> user
app.get("/api/user", getAllUser);
// 2. get the user
app.get("/api/user/:id", getUser);
// 3. update the user
app.patch("/api/user/:id", updateUser);
// 4 delete the user
app.delete("/api/user/:id", deleteUser);

// 5. resource not found
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

/***
 * Ecommerce
 *      * name
 *      * brand
 *      * description
 *      * price
 *      * discount
 *      * categories
 * **/

/***
 * 1. Proper -> arch(MVC)
 * 2. REST API ->
 * 3. DRY principle
 *
 * **/
