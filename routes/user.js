const express = require('express');
const router = express();
const validate = require('../helpers/tokenHelper').validate

//user controler
const userController = require("../controllers/userController");

router.get("/get/list", validate, userController.getUsersList);
router.delete("/delete/:id", validate, userController.removeUser);

module.exports = router;
