const express = require("express");
const UserRouter = express.Router();
const {
  createUser,
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/UserContoller");
const { sanityMiddleWare } = require("../middleware/sanityReqObj");

/***********************user starts*********************/
// UserRouter.post("/", sanityMiddleWare, createUser); // profile page -> user
// UserRouter.get("/", getAllUser);
//---------------------------------
ProductRouter.route("/").post(sanityMiddleWare, createUser).get(getAllUser);
//----------------------------------
// // 2. get the user
// UserRouter.get("/:id", getUser);
// // 3. update the user
// UserRouter.patch("/:id", updateUser);
// // 4 delete the user
// UserRouter.delete("/:id", deleteUser);

UserRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = UserRouter;
/***********************user ends*********************/
