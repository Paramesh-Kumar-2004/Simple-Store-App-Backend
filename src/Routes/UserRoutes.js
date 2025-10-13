const express = require("express")
const router = express.Router()

const { registerUser, loginUser, getUsers, createUser, deleteUser, updateUser, getSingleUser, logoutUser } = require("../Controllers/UserControllers")
const { isAuthenticate, authenticateRoles } = require("../Middleware/AuthenticateUser")



router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
// router.route("/logout").get(isAuthenticate, logoutUser)
router.route("/logout").get(logoutUser)
router.route("/users")
    .get(isAuthenticate, authenticateRoles("admin"), getUsers)
    .post(isAuthenticate, authenticateRoles("admin"), createUser)

router.route("/user/:id")
    .get(isAuthenticate, authenticateRoles("admin"), getSingleUser)
    .delete(isAuthenticate, authenticateRoles("admin"), deleteUser)
    .put(isAuthenticate, authenticateRoles("admin"), updateUser)


module.exports = router