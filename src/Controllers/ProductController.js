const fs = require('fs').promises;
const path = require("path")

const CatchAsyncError = require("../Middleware/CatchAsyncError");
const ErrorHandler = require("../Utils/ErrorHandler");
const Product = require("../Models/ProductModel");



// 1 Create Product
const createProduct = CatchAsyncError(async (req, res, next) => {
    console.log("\nEntered Into Create Products")
    try {
        const user = req.user.id
        const img = req.file ? req.file.path.replace(/\\/g, "/") : null;

        const {
            name,
            model,
            price,
            category,
            description,
            stock,
            sellerName,
            sellerEmail,
            sellerPhone
        } = req.body;

        const product = await Product.create({
            name,
            model,
            price,
            user,
            category,
            description,
            stock,
            sellerName,
            sellerEmail,
            sellerPhone,
            image: img
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product,
        });
    }
    catch (error) {
        try {
            if (req.file && req.file.path) {
                const filePath = path.resolve(req.file.path);
                console.log("Deleting file:", filePath);
                await fs.unlink(filePath);
            }
        }
        catch (err) {
            console.error("Failed to delete file:", err);
        }
        return next(new ErrorHandler(error.message, 400));
    }
});


// 2 Get All Products
const getAllProducts = CatchAsyncError(async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    }
    catch (error) {
        return next(new ErrorHandler(error, 500))
    }
});


// 3 Get Single Product
const getSingleProduct = CatchAsyncError(async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        res.status(200).json({
            success: true,
            product
        });
    }
    catch (error) {
        return next(new ErrorHandler(error, 500))
    }
});


// 4 Update Product
const updateProduct = CatchAsyncError(async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        const {
            price,
            stock,
        } = req.body;

        product = await Product.findByIdAndUpdate(
            req.params.id,
            { price, stock },
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        });
    }
    catch (error) {
        return next(new ErrorHandler(error, 500))
    }
});


// 5 Delete Product
const deleteProduct = CatchAsyncError(async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        await Product.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            product
        });
    }
    catch (error) {
        return next(new ErrorHandler(error, 500))
    }
});


module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
};