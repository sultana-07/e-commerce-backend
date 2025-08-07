
const { json } = require("express");
const userModel = require("../models/user.models");
const {validationResult} = require("express-validator")


module.exports.registerUser = async (req,res) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({error : error.array()});
    }

    const {role,username,email,password} = req.body;

    try {
        const user   = await userModel.create({
        role : role || "buyer",
        username,
        email,
        password
    })

    await user.save();

    const token = await user.generateAuthToken();

    res.status(201).json({token,user})
    } catch (error) {
        res.status(401).json({errors : "error while rgistering user"})
    }
}


module.exports.loginUser = async (req,res) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        res.status(401).json({error : "eror in validate result login user"})
    }

    const {email,password} = req.body;
    console.log(email)

   try {
     const user = await userModel.findOne({email,password});
    
     const token = await user.generateAuthToken();

     res.status(201).json({token,user})
   } catch (error) {
       res.status(401).json({erorr : "error in catch section of login user"})
   }
}