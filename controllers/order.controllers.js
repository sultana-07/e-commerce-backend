const order = require("../models/order.models")


module.exports.createOrder = async(req,res) => {
    try {
        const {items,amount,paymentMethod,razorpayPaymentId,razorpayOrderId,} = req.body;

        const newOrder = await order.create({
            userId : req.user?.id || "guest_user",
            items,
            amount,
            paymentMethod,
            orderStatus : "Pending",
            paymentStatus : paymentMethod === "COD" ? "Pending" : "Paid",
            razorpayPaymentId : razorpayPaymentId || null,
            razorpayOrderId :razorpayOrderId || null
        });

        res.status(201).json({message : "order place successful", newOrder})


    } catch (error) {
        res.status(500).json({error : "error in creating a order",error})
    }
}

module.exports.getUserOrder = async (req,res) => {
    try {
        const userId = req.params.userId;
        const orders = await order.find({userId})
        .populate("productIds")
        .sort({createdAt : -1});
        res.status(201).json(orders)
    } catch (error) {
        
    }
}