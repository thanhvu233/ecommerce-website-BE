const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router
  .route("/feature-products")
  .get(productController.getFeatureProducts, productController.getAllProducts);

router
  .route("/latest-products")
  .get(productController.getLatestProducts, productController.getAllProducts);

router
  .route("/signature-product")
  .get(productController.getSignatureProduct, productController.getProduct);

router
  .route("/")
  .get(productController.getProductCount, productController.getAllProducts);

router.route("/:id").get(productController.getProduct);

module.exports = router;
