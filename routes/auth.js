const express = require('express');
const router = express();


//user controler
const userController = require("../controllers/userController");

router.post("/signup", userController.validateAuthCredentials, userController.signUp);
router.post("/signin", userController.validateAuthCredentials, userController.signIn);


module.exports = router;

