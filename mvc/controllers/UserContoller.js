const UserModel = require("../models/UserModel");
const {
  createFactory,
  getAllFactory,
  getFactory,
  updateFactory,
  deleteFactory,
} = require("../utils/resourceFactory");
/***************handler functions**********************/

const createUser = createFactory(UserModel);
const getAllUser = getAllFactory(UserModel);
const getUser = getFactory(UserModel);
const updateUser = updateFactory(UserModel);
const deleteUser = deleteFactory(UserModel);

module.exports = {
  createUser,
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
};
