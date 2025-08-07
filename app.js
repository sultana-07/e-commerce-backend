const express = require('express');
const app = express();
const dotenv = require("dotenv")
dotenv.config();
const userRouter = require("./routers/auth")
const productRouter = require("./routers/products")
const orderRouter = require("./routers/order")
const addToCartRouter = require("./routers/addToCart");
const connectDB = require('./db/db')

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/',(req,res) => {
    res.send("hello world in a ecomerce")
})

app.use("/user",userRouter)
app.use("/product",productRouter)
app.use("/order",orderRouter)
app.use("/item",addToCartRouter)

module.exports = app;