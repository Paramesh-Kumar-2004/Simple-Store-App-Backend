const express = require("express")
const path = require("path")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv").config()

const ErrorHandlerMiddleWare = require("./Middleware/Error")
const ConnectDB = require("./DBConfig/DBConfig")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser())

ConnectDB()


// Routes
const UserRoutes = require("./Routes/UserRoutes")
const ProductRoutes = require("./Routes/ProductRoute")

app.use("/uploads", express.static("uploads"));

app.use("/api/v1/", UserRoutes)
app.use("/api/v1/", ProductRoutes)

app.get("/", (req, res) => {
    res.json("Done")
})

app.use(ErrorHandlerMiddleWare)

app.listen(process.env.PORT, () => {
    console.log(`Server Running At... : http://localhost:${process.env.PORT}`)
})