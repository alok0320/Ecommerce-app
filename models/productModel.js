const mongoose = require("mongoose");
const validator = require("validator");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique: [true, "Product with this Name Already Exist"],
    minlength: [5, "A tour must have minimum charactr 5"],
  },
  price: {
    type: Number,
    required: true,
  },
  maxprice: {
    type: Number,
    required: true,
  },
  totalprice: {
    type: Number
  },

  manufactured_State: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
  },
  availableQty: {
    type: Number
  },
  productWeight: {
    type: Number
  },
  deliveryCharge: {
    type: Number
  },
  productDescription: {
    type: String
  },
  approvedBy: {
    type: String
  },
  enableDisplay: {
    type: String
  },
  photo1: {
    type: String,
    // required: true,
  },
  photo2: {
    type: String,
    // required: true,
  },
  dealOfDay: {
    type: String
  },
  tag1: {
    type: String
  },
  tag2: {
    type: String
  },
  tag3: {
    type: String
  },
  tag3: {
    type: String
  },
});

// productSchema.pre("save", function () {
//   console.log(this);
// });

const Product = mongoose.model("Product", productSchema);
// Product.createIndexes();

module.exports = Product;