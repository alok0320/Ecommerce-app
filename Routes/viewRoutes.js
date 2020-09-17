const express = require('express');
const router = express.Router();
const viewsController = require('./../controllers/viewController')
const authController = require('./../controllers/authController');

router.use(authController.isLoggedIn)


router.get('/', viewsController.getProducts);

router.get('/add-to-cart/:id', viewsController.addToCart);

router.get('/me', authController.protect, viewsController.getUserPage)
//Cart Routes
router.get('/shopping-cart', viewsController.shoppingCart);
router.get('/reduceByOne/:id', viewsController.reduceCartByOne);
router.get('/increaseByOne/:id', viewsController.increaseCartByOne);
router.get('/removeItem/:id', viewsController.removeItem);

//Authentication Route
router.get('/login', viewsController.login);
router.get('/signup', viewsController.signup);

router.get('/checkout', authController.protect, viewsController.getCheckout);
router.post('/checkout', authController.protect, viewsController.postCheckout);



// Admin Routes (Only for Admins)
router.get('/admin-dashboard', authController.protect, authController.restrictTo("admin"), viewsController.adminDashboard);
router.get('/admin-add_products', authController.protect, authController.restrictTo("admin"), viewsController.addNewProduct);
router.get('/admin-view_All_products', authController.protect, authController.restrictTo("admin"), viewsController.ADMINgetAllProducts);
router.get('/admin-view_All_Users', authController.protect, authController.restrictTo("admin"), viewsController.ADMINgetAllUsers);
router.get('/delete-prod/:id', viewsController.deleteprod)

//User Update USing /me ROUTE

router.get('/update-user-data', authController.protect, viewsController.updateUserData)

module.exports = router;