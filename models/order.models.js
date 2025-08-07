const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },

    items : [
        {
            productId : {type : mongoose.Schema.Types.ObjectId, ref : 'Products'},
            name : String,
            quantity : Number,
            price : Number,
        },
    ],

    amount : {type : Number, required : true},
    paymentMethod : {type : String, enum : ["COD","Razorpay"],required : true},
    paymentStatus : {type : String, enum : ["Pending","Piad"],default : "Pending"},
    orderStatus : {type : String, enum : ["Pending", "Shipped", " Delivered"], default : "Pending"},
    razorpayPaymentId :  {type : String, default : null},
    razorpayOrderId : {type : String, default : null},
    creatAt : {type : Date,default : Date.now()},
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;