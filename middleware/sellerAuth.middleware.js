const jwt = require("jsonwebtoken")
const userModel = require("../models/user.models");

module.exports = async (req,res,next) => {
    try {
        const token  = req.header("Authorization").replace("Bearer ","");

        const decode = jwt.verify(token,process.env.JWT_SECRET);

        const user = await userModel.findById(decode._id);

        if(!user || user.role !== "seller"){
            return res.status(403).json({error : "Access denied ! seller only"})
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({error  : "Authentication failed !"})
    }
}