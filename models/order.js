const mongoose = require("mongoose");
const validator = require("validator");
const {
    schema
} = require("./productModel");

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    cart: {
        type: Object,
        required: true,

    },
    address: {
        type: Object,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "orderPlaced"
    },

    createdAt: {
        type: Number,

    }

});

// productSchema.pre("save", function () {
//   console.log(this);
// });

const Order = mongoose.model("Order", orderSchema);
// Product.createIndexes();

module.exports = Order;