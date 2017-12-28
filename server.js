var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var connect = require('./db/connect')
var { routes } = require('./utility/routes')



app.use('/uploads', express.static('uploads'))

app.use(bodyParser.json());



app.use('/', routes)

app.listen(process.env.PORT || 3000, () => {
	console.log("Listening at port 3000")
});


