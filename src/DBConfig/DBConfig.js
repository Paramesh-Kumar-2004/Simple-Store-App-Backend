const mongoose = require("mongoose")
const User = require("../Models/UserModel")

async function ConnectDB() {
    mongoose.connect(process.env.DB_URL)
        .then(async () => {
            try {
                const user = await User.findOne({ email: process.env.ADMIN_EMAIL })
                if (user) {
                    console.log("Admin User Already Added")
                }
                await User.create({ name: process.env.ADMIN_NAME, email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASS, role: "admin" })
                console.log("Admin Data Added")
            }
            catch (error) {
                console.log("Error While Saving A Admin User : ", error.message)
            }
            console.log("✅ MongoDB Connected")
        })
        .catch(err => console.error("❌ MongoDB Connection Error:", err));
}

module.exports = ConnectDB;
