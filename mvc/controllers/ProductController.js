const ProductModel = require("../models/ProductModel");
const {
  createFactory,
  getAllFactory,
  getFactory,
  updateFactory,
  deleteFactory,
} = require("../utils/resourceFactory");

const createProduct = createFactory(ProductModel);
const getAllProduct = getAllFactory(ProductModel);
const getProduct = getFactory(ProductModel);
const updateProduct = updateFactory(ProductModel);
const deleteProduct = deleteFactory(ProductModel);
module.exports = {
  createProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
