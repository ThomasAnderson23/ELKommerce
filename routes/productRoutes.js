const express = require("express");
const {
  createProduct,
  getProducts,
} = require("../controllers/product.controller");
const auth = require("../Middlewares/auth");
const isAdmin = require("../Middlewares/isAdmin");

const productRouter = express.Router();

productRouter.route("/products").post(auth, createProduct).get(auth, isAdmin, getProducts);

module.exports = productRouter;
