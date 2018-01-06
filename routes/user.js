const express = require('express');
const router = express();
const validate = require('../helpers/tokenHelper').validate

//user controler
const userController = require("../controllers/userController");

router.get("/get/list", userController.getUsersList);
router.delete("/delete/:id", userController.removeUser);

module.exports = router;
