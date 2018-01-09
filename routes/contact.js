const express = require('express');
const router = express();


const contactController = require("../controllers/contactController");

router.post('/submitquery', contactController.submitQuery)
router.get('/getqueries', contactController.getQueries)
router.get('/getquery/:id', contactController.getQuery)

module.exports = router