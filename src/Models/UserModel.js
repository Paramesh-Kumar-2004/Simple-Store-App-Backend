const mongoose = require("mongoose")
const validator = require("email-validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter The Name"],
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, "Enter The Email"],
        unique: [true, "This Email Already Registered"],
        validate: [validator.validate, "Please Enter The Valid Email"]
    },
    password: {
        type: String,
        required: [true, "Enter The Password"],
        select: false,
    },
    role: {
        type: String,
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

UserSchema.methods.isPasswordValid = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

UserSchema.methods.getJWTtoken = async function () {
    return jwt.sign(
        { id: this._id }, process.env.JWT_SECRET,
        { expiresIn: process.env.EXPIRES }
    )
}


module.exports = mongoose.model("User", UserSchema)