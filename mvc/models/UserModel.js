const mongoose = require("mongoose");
/*********************userSchema**************************/
let userSchemaObject = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
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
  createAt: {
    type: Date,
    default: Date.now(),
  },
  role: {
    type: String,
    default: "user",
  },
};
const userSchema = new mongoose.Schema(userSchemaObject);

/**********************pre-hooks*****************/
userSchema.pre("save", function () {
  this.confirmPassword = undefined;
  next();
});
const roles = ["admin", "buyer", "seller"];
userSchema.pre("save", function (next) {
  let isPresent = roles.find((cRole) => {
    return cRole == this.role;
  });
  if (isPresent == undefined) {
    const error = new Error("role is invalid");
    next(error);
  }
  return next();
});

/***
 * find-> ->getall the proprties , but remove password, confirmpassword, __v from the result if someone ises findOne method of mangoose result
 * ***/
userSchema.pre("findOne", function (next) {
  this.select("-password -confirmPassword -__v");
  next();
});

userSchema.post("save", function (error, doc, next) {
  /***
   * 1.  error -> error parameter
   * 2. doc -> document which is saved
   * 3. next -> next middleware
   * **/
  if (error.code == 11000) {
    next(new Error("email is already registered"));
  }
  next();
});

// USERMODEL
const UserModel = mongoose.model("UserModel", userSchema);

module.exports = UserModel;
