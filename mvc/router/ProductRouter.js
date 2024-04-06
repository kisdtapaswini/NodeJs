const express = require("express");
const ProductRouter = express.Router();

const {
  createProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/ProductController");
const { sanityMiddleWare } = require("../middleware/sanityReqObj");

/***********************product start*********************/
//1. create a product
// ProductRouter.post("/", sanityMiddleWare, createProduct); // profile page -> user
// ProductRouter.get("/", getAllProduct);

//---------------------------------
ProductRouter.route("/")
  .post(sanityMiddleWare, createProduct)
  .get(getAllProduct);
//----------------------------------
// // 2. get the user
// ProductRouter.get("/:id", getProduct);
// // 3. update the user
// ProductRouter.patch("/:id", updateProduct);
// // 4 delete the user
// ProductRouter.delete("/:id", deleteProduct);

ProductRouter.route("/:id")
  .get(getProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = ProductRouter;
/***********************product ends*********************/
