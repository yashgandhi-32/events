const express = require('express');
const router = express();
const validate = require('../helpers/tokenHelper').validate

//event controler
const eventController = require("../controllers/eventController");

router.get("/get/list", validate, eventController.getEventsList);

module.exports = router;