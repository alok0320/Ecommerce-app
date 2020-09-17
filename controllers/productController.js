const express = require("express");
const Product = require("./../models/productModel");
const validator = require("validator");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");
const mongoose = require("mongoose");




exports.getAllProducts = catchAsync(async (req, res, next) => {

  const products = await Product.find();
  if (!products) {
    return next(new AppError('No product found with this ID'));
  }
  res.status(200).json({
    status: "success",
    result: products.length,
    data: {
      products,
    }
  });
});



exports.getSingleProduct = catchAsync(async (req, res, next) => {

  const singleProduct = await Product.findById(req.params.id);

  if (!singleProduct) {
    return next(new AppError('No product found with this ID', 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      singleProduct,
    },
  });
});



exports.addNewProduct = catchAsync(async (req, res, next) => {


  const newProduct = await Product.create({
    name: req.body.name,
    price: req.body.price,
    maxprice: req.body.maxprice,
    category: req.body.category,
    subcategory: req.body.subcategory,
    availableQty: req.body.availableQty,
    productWeight: req.body.productWeight,
    deliveryCharge: req.body.deliveryCharge,
    productDescription: req.body.productDescription,
    approvedBy: req.body.approvedBy,
    enableDisplay: req.body.enableDisplay,
    manufactured_State: req.body.manufactured_State,

  });

  res.status(201).json({
    status: "Success",
    data: {
      product: newProduct,

    },
  });

});



exports.updateProduct = catchAsync(async (req, res, next) => {

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!product) {
    return next(new AppError('No product found with this ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      product
    }
  });
});


exports.deleteProduct = catchAsync(async (req, res, next) => {

  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new AppError('No product found with this ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});