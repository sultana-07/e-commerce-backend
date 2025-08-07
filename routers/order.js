const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controllers")
const userAuth = require("../middleware/userAuth.middleware")


router.post("/create",userAuth,orderController.createOrder )
router.get("/get/:userId",orderController.getUserOrder)

module.exports = router;