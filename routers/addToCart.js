const addToCartControllers = require("../controllers/addToCart.controllers");
const express = require("express");
const router = express.Router();

router.post("/addtocart",addToCartControllers.addToCart)
router.put("/removecart",addToCartControllers.removeCart)

module.exports = router;