const express = require("express")
const { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct } = require("../Controllers/ProductController")
const { isAuthenticate, authenticateRoles } = require("../Middleware/AuthenticateUser")
const { upload } = require("../Middleware/Multer")
const router = express.Router()



router.route("/createProducts").post(isAuthenticate, authenticateRoles("admin"), upload, createProduct)

// router.route("/getAllProducts").get(isAuthenticate, getAllProducts)
router.route("/getAllProducts").get(getAllProducts)

router.route("/getSingleProduct/:id").get(isAuthenticate, getSingleProduct)

router.route("/editProducts/:id")
    .put(isAuthenticate, authenticateRoles("admin"), updateProduct)
    .delete(isAuthenticate, authenticateRoles("admin"), deleteProduct)


module.exports = router