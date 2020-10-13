const express = require("express");
const productController = require("./../controllers/productController");
const authController = require("./../controllers/authController");

const router = new express.Router();
// router.param('id', productController.checkId);




router
  .route("/")
  .get(authController.protect, authController.restrictTo("admin"), productController.getAllProducts)
  .post(authController.protect, productController.uploadProductPhoto, productController.resizeProductImage, productController.addNewProduct);

router
  .route("/:id")
  .get(productController.getSingleProduct)
  .patch(productController.updateProduct)
  .delete(
    authController.protect,
    authController.restrictTo("admin", "seller"),
    productController.deleteProduct
  );

module.exports = router;