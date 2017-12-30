const express = require('express');
const router = express();
const validate = require('../helpers/tokenhelper').validate

//user controler
const userController = require("../controllers/user");

console.log(typeof validate)
router.get("/get/list", validate, userController.getUsersList);


module.exports = router;
