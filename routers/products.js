const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer.middleware")
const productController = require("../controllers/product.controller.js")
const sellerAuth = require("../middleware/sellerAuth.middleware.js")


router.post("/upload",sellerAuth,upload.array('images',5),
      productController.uploadiamge
)

router.get("/category/:category",productController.getProductCategoryWise)
router.get("/:title",productController.getProductTitle)
router.get("/id/:_id",productController.getProductId)

module.exports = router;