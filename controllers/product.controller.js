const uploadToCloudinary = require("../utils/cloudinary");
const productModel = require("../models/products.models")


module.exports.uploadiamge = async (req,res) => {
    try {
        const {title,description,price,category} = req.body;
        console.log(req.files[0])

        //upload each file to cloudinary
        const imageUploadPromise = req.files.map(file => uploadToCloudinary(file.buffer,file.originalname));
        const imageUrls = await Promise.all(imageUploadPromise);

        // save product to mongodb

        const newProduct = await productModel.create({
            title,
            description,
            price,
            category,
            images : imageUrls
        });

        res.status(201).json(newProduct)
    } catch (error) {
        console.log(error);
        res.status(500).json({eror : "error in upload product catch section"})
    }
}

module.exports.getProductCategoryWise = async (req,res) => {
    try {
        const category = req.params.category;
        console.log("category = ",category);
        
        const Products = await productModel.find({category});
        res.status(201).json(Products)

    } catch (error) {
        res.status(500).json({error : "error in get products by category wise catch section"})
    }
}

module.exports.getProductTitle = async(req,res) => {
    try {
        const title = req.params.title;

        const products = await productModel.find({title});
        res.status(201).json(products)
    } catch (error) {
        res.status(401).json({error : "error in get products by title catch section"})
    }
}

module.exports.getProductId = async (req,res) => {
    try {
        const id = req.params._id;

        const product = await productModel.findOne({_id : id})
        res.status(201).json(product)
    } catch (error) {
        res.status(401).json({error : "error in get product by id in catch section"})
    }
}
