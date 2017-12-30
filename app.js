const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const expressValidator = require('express-validator');


//serving static files
app.use('/uploads', express.static('uploads'))

// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Express-validator
app.use(expressValidator({
	errorFormatter: function (param, msg, value) {
		var namespace = param.split('.'),
			root = namespace.shift(),
			formParam = root;

		while (namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param: formParam,
			msg: msg,
			value: value
		};
	}
}));

const indexRouter = require('./routes/index');
const appRouter = require('./routes/app');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');


app.use('/', appRouter)
app.use('/api/auth', authRouter)
//app.use('/api/app', appRouter)
app.use('/api/user', userRouter)
module.exports = app