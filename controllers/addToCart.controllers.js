const addToCart = require("../models/addToCart.models");

module.exports.addToCart = async(req,res) => {
    try {
        const {user,products} = req.body;

        let exitUser =await addToCart.findOne({user});

        if(exitUser){
             exitUser.products.push(...products);
             await exitUser.save();
        }else{
            exitUser = await addToCart.create({user,products

            })
        }

       
       const populateCart = await exitUser.populate("products.product");
       console.log(populateCart)
        res.status(201).json({newItem : populateCart})
    } catch (error) {
        res.status(500).json({error : "error in addtocart controller "})
    }
}

module.exports.removeCart = async (req,res) => {
    try {
        const {userId,productsId} = req.body;
        let cart = await addToCart.findOne({user : userId});

      
        if(!cart){
           return res.status(401).json({erorr : "cart not found"})
        }

        cart.products = cart.products.filter(
            item =>  item.product.toString() != productsId
             
        );

        await cart.save();

        const populateCart = await cart.populate("products.product")
        res.status(201).json(populateCart)

    } catch (error) {
        res.status(500).json({error : "error in remove from cart catch section"})
    }
}