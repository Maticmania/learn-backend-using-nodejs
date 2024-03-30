//import express
const express = require("express");
const {
  createProduct,
  getProductById,
  getAllProduct,
  updateProduct,
  deleteProduct,
  getProductBySlug,
} = require("../controllers/product");

//create express routes
const router = express.Router();

//define your routes
router.post("/create", createProduct);
router.get("/all", getAllProduct);
router.get("/:productId", getProductById);
router.get("/slug/:slug", getProductBySlug);
router.put("/update/:updateId", updateProduct);
router.delete("/:productId", deleteProduct);

module.exports = router;
