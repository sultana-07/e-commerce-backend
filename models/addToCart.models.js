const mongoose = require("mongoose");

const addToCartSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },

    products : [
        {
           product : {
              type : mongoose.Schema.Types.ObjectId,
              ref : 'Products'
           },
           quantity : {
            type : Number,
            default : 1
           }
        }
    ]
})

const addToCart = mongoose.model("AddToCart",addToCartSchema);

module.exports = addToCart;