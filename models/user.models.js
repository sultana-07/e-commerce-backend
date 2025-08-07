const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")

const userSchema =new mongoose.Schema({
    role : {
        type : String,
        enum : ['buyer','seller'],
        default : 'buyer'
    },
    username : {
        type : String,
        required : true
    },

    email :{
        type : String,
        required :true
    },

    password : {
        type : Number,
        required : true
    },

    createdAt : {
        type : Date,
        default : Date.now()
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id : this._id},process.env.JWT_SECRET,{expiresIn : '24h'});
    return token;
}

const User = mongoose.model('User',userSchema);

module.exports = User;