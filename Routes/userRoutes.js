const express = require("express");
const userController = require("./../controllers/userControllers.js");
const authController = require("./../controllers/authController.js");

const router = new express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.patch("/updateMyPassword", authController.protect, authController.updatePassword);

router.patch("/updateMe", authController.protect, userController.updateMe);

router
  .route("/")
  .get(authController.protect, userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getSingleUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;