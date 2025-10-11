const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter Product Name"],
        trim: true
    },
    user: mongoose.Schema.ObjectId,
    price: {
        type: Number,
        required: [true, "Enter Product Price"],
        min: [0, "Price must be positive"]
    },
    category: {
        type: String,
    },
    description: {
        type: String,
        default: "No description provided"
    },
    stock: {
        type: Number,
        default: 1,
        min: [0, "Stock cannot be negative"]
    },
    sellerName: {
        type: String,
        required: [true, "Enter Seller Name"]
    },
    sellerEmail: {
        type: String,
        required: [true, "Enter Seller Email"]
    },
    sellerPhone: {
        type: String,
        required: [true, "Enter Seller Contact Number"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Product", ProductSchema);