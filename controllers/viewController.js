// const catchAsync = require('./errorController');
const Product = require('./../models/productModel');
const Cart = require('./../models/cart');
const {
    createTestAccount
} = require('nodemailer');
const User = require('../models/userModel');
const axios = require('axios');


exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.render('mainPage', {
            products,
        });
    } catch (err) {
        console.log(err);
    }
}

exports.addToCart = (req, res, next) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, (err, product) => {

        cart.add(product, product._id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/shopping-cart');
    })

    // ******************  Apply Better error handling**********/
}



exports.shoppingCart = (req, res, next) => {
    if (!req.session.cart) {
        return res.render('cart-view', {
            products: null
        });
    }

    const cart = new Cart(req.session.cart);
    res.render('cart-view', {
        products: cart.generateArray(),
        totalPrice: cart.totalPrice,
        finalprice: cart.finalprice,
        discount: cart.discount,



    });
}

exports.reduceCartByOne = (req, res, next) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
}

exports.increaseCartByOne = (req, res, next) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.increaseByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
}


exports.removeItem = (req, res, next) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
}

exports.getCheckout = (req, res, next) => {
    if (!req.session.cart) {
        return res.redirect('/');
    } else if (req.session.cart.totalPrice <= 0) {
        return res.redirect('/');
    }
    const cart = new Cart(req.session.cart);
    res.render('checkout', {
        products: cart
    })
}

exports.getUserPage = (req, res, next) => {
    res.render('user-page');
}
// ********************************************************ADMIN AREA CONTROLLER*********************
exports.adminDashboard = (req, res, next) => {
    res.render('admin-dashboard');
}

exports.addNewProduct = (req, res, next) => {
    res.render('add-new-product')
}

exports.ADMINgetAllProducts = async (req, res, next) => {
    try {
        const d = await axios({
            method: "GET",
            url: "http://localhost:5000/alok/api/v1/products",
            headers: {
                "Authorization": `Bearer ${req.cookies.jwt}`

            }

        })
        // console.log("llllllllllllllllllll:::::::" + d.data.data.products);
        console.log(d);
        console.log(req.cookies.jwt);
        const body = d.data.data;
        res.render('admin_GetAllProduct', {
            products: body.products
        })

    } catch (error) {
        console.log(error);
    }
}



exports.ADMINgetAllUsers = async (req, res, next) => {
    try {
        const d = await axios({
            method: "GET",
            url: "http://localhost:5000/alok/api/v1/users",
            headers: {
                "Authorization": `Bearer ${req.cookies.jwt}`

            }

        })
        // console.log("llllllllllllllllllll:::::::" + d.data.data.products);

        const body = d.data.data;
        res.render('admin_GetAllUsers', {
            users: body.users
        })

    } catch (error) {
        console.log(error);
    }
}





exports.deleteprod = async (req, res, next) => {
    try {
        const ID = req.params.id;

        const result = await axios({
            method: "GET",
            url: `http://localhost:5000/alok/api/v1/products/${ID}`
        })
        console.log("rsssssssssssssssssssssssssssssssssse:::" + result.data);
        res.render("admin_Update_Product", {
            result: result.data.data.singleProduct
        });
    } catch (error) {
        console.log("Error");
    }
}








// ********************************************************ADMIN AREA CONTROLLER (Ends)*********************


exports.login = (req, res, next) => {

    res.render('login')
}

exports.signup = (req, res, next) => {
    res.render('signup')
}


exports.updateUserData = async (req, res, next) => {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, {
        name: req.body.name,
        email: req.body.email
    }, {
        new: true,
        runValidators: true
    });
    res.status(200).render('user-page', {
        user: updatedUser
    })
}