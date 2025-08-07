const express = require('express');
const router = express.Router();
const {body} = require("express-validator");
const usercontroller = require("../controllers/user.controllers")


router.post("/register", [
      body("username").isLength({min : 4}).withMessage("username is required"),
      body("email").isEmail().withMessage("e-mail is required"),
      body("password").isLength({min : 6}).withMessage("password is required"),
],
     usercontroller.registerUser
);

router.post("/login",[
    body("email").isEmail().withMessage("e-mail is required"),
    body("password").isLength({min : 6}).withMessage("password is required"),
],
     usercontroller.loginUser
);

module.exports = router;

