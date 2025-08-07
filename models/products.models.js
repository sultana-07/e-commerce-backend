const mongoose = require("mongoose");

const productsScheam = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },

    description : {
        type : String ,
        required : true
    },

    images : {
        type : [String],
        required : true
    },

    price : {
        type : String,
        required : true
    },

    category : {
        type : String,
        required : true
    },

    createdAt : {
        type : Date,
        default : Date.now()
    }
})

const Products = mongoose.model("Products",productsScheam);
module.exports = Products;