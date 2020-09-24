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

  productDescription: {
    type: String
  },
  approvedBy: {
    type: String
  },
  enableDisplay: {
    type: String
  },
  photo: {
    type: String,
    required: true,
  },
  paymentRefund: {
    type: String,
    default: "pending"
  },
  // photo2: {

  //   data: Buffer,
  //   contentType: String

  // },
  dealOfDay: {
    type: String,
    default: "No"
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
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// productSchema.pre("save", function () {
//   console.log(this);
// });

const Product = mongoose.model("Product", productSchema);
// Product.createIndexes();

module.exports = Product;