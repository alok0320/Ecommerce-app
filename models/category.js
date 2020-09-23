const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({

    category: {
        type: String,
        required: true
    },

    subCategory: {
        type: String
    },
    off: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: "img/22.jpeg"
    }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;