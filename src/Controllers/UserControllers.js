const CatchAsyncError = require("../Middleware/CatchAsyncError");
const ErrorHandler = require("../Utils/ErrorHandler")
const User = require("../Models/UserModel");
const ApiResponse = require("../Utils/ApiResponse");



const cookieOptions = {
    httpOnly: true,  // Prevent JavaScript access to cookies
    sameSite: 'Strict',  // Cookies only sent for same-site requests
    maxAge: 24 * 60 * 60 * 1000,  // Set cookie expiration (1 day)
};


const registerUser = CatchAsyncError(async (req, res, next) => {
    console.log("Entered Into Register User Controller")
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return next(new ErrorHandler("Enter All The Fields", 400))
        }

        const isExist = await User.findOne({ email })
        if (isExist) {
            return res.status(404).json({
                "message": "Email Already Created",
                isExist
            })
        }

        const user = await User.create({ name, email, password })
        const token = await user.getJWTtoken()

        return res.status(200)
            .cookie("token", token, cookieOptions)
            .json(
                new ApiResponse(200, { user, token }, "User Created Successfully")
            )
    }
    catch (error) {
        return next(new ErrorHandler(error, 500))
    }
})


const loginUser = CatchAsyncError(async (req, res, next) => {
    console.log("Entered Into Login User Controller")
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({
                "message": "Enter All The Fields"
            })
        }

        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            return next(new ErrorHandler("Invalid Credentials", 404))
        }

        if (!await user.isPasswordValid(password)) {
            return next(new ErrorHandler("Invalid Credentials", 404))
            // return res.json(new ApiResponse(404,null,"Invalid Credentials"))
        }

        const token = await user.getJWTtoken()

        res.status(200)
            .cookie("token", token, cookieOptions)
            .status(200)
            .json({
                "message": "Login Success",
                // user,
                name: user.name,
                email: user.email,
                role: user.role,
                token
            })
    }
    catch (error) {
        console.log(error)
        return next(new ErrorHandler(error, 500))
    }
})


const logoutUser = CatchAsyncError(async (req, res, next) => {
    console.log("Entered Into Log Out User Controller")
    try {
        // const user = await User.findById(req.user.id)
        res.clearCookie("token")
        return res.status(200).json({
            "message": "Logout Success"
        })
    }
    catch (error) {
        return next(new ErrorHandler(error.message, 500))
        console.log(error.message)
    }
})


const getUsers = CatchAsyncError(async (req, res, next) => {
    console.log("Entered Into Get User Controller")
    try {
        const user = await User.find()

        if (!user) {
            return res.status(404).json({
                "message": "User Not Found",
            })
        }

        return res.status(200).json({
            "message": "Users Found",
            "totalUser": user.length,
            user
        })

    }
    catch (error) {
        next(new ErrorHandler(error.message))
    }
})


const getSingleUser = CatchAsyncError(async (req, res, next) => {
    console.log("Entered Into Get Single User Controller")
    try {
        const { id } = req.params;
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({
                "message": "User Not Found",
                id,
            })
        }
        res.status(200).json({
            "message": "User Found Successfully",
            user
        })
    }
    catch (error) {
        return next(new ErrorHandler(error, 500))
    }
})


const createUser = CatchAsyncError(async (req, res, next) => {
    console.log("Entered Into Create User Controller")
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            next(new ErrorHandler("Enter All The Fields", 400))
        }

        const isExist = await User.findOne({ email })
        if (isExist) {
            return res.status(404).json({
                "message": "This Email Already Exist",
                isExist
            })
        }

        const user = await User.create({ name, email, password })
        if (!user) {
            return res.status(400).json({
                "message": "Something Went Wrong... Try Again Later"
            })
        }

        return res.status(200).json({
            "message": "User Create Successfully",
            user
        })
    }
    catch (error) {
        next(new ErrorHandler(error.message, 505))
    }

})


const deleteUser = CatchAsyncError(async (req, res, next) => {
    console.log("Entered Into Delete User Controller")
    try {
        const { id } = req.params;

        const isExist = await User.findById(id)
        if (!isExist) {
            return res.status(404).json({
                "success": false,
                "message": "User Not Found For The Given ID",
                id,
                isExist
            })
        }

        const user = await User.findByIdAndDelete(id)
        return res.status(200).json({
            "message": "User Delete Successfully",
            user
        })
    }
    catch (error) {
        next(new ErrorHandler(error.message, 505))
    }
})


const updateUser = CatchAsyncError(async (req, res, next) => {
    console.log("Entered Into Update User Controller")
    try {

        const { id } = req.params;
        const { role } = req.body;

        const user = await User.findByIdAndUpdate(
            id,
            { role },
            { new: true }
        )

        if (!user) {
            return res.status(404).json({
                "success": false,
                "message": "User Not Found Given ID",
                id
            })
        }

        return res.json({
            "success": true,
            "message": "User Updated Successfully",
            user
        })

    } catch (error) {
        next(new ErrorHandler(error.message))
    }
})

module.exports = { registerUser, loginUser, logoutUser, getSingleUser, getUsers, createUser, deleteUser, updateUser }
