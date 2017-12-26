var express = require('express');
var bodyParser = require('body-parser')
var _ = require('lodash');
var app = express();
var { User } = require('./models/user')
var { Todo } = require('./models/todo')
var connect = require('./db/connect')
var jwt = require('jsonwebtoken')
var { Event } = require('./models/event')
var { errorgenerator } = require('./utility/errorgenerator')
var { generatedata } = require('./utility/generatedata')

const multer = require('multer')

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, __dirname + '/uploads/')
	},
	filename: function (req, file, cb) {
		cb(null, new Date().toISOString() + file.originalname)
	}
});

const fileFilter = function (req, file, cb) {
	if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype == 'image/jpeg') {
		cb(null, true)
	} else
		cb(null, false)
}

const upload = multer({ dest: './uploads/' });

app.use('/uploads' + express.static('uploads'))

app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send('<h1>Hello</h1>')
})
app.post('/api/signup', (req, res) => {
	var body = _.pick(req.body, ['email', 'password', 'name'])
	var user = new User(body);
	user.save().then((user) => {
		res.status(200).json({
			error: false,
			errors: [],
			data: generatedata(_.pick(user, ['email', 'createdAt', '_id', 'name']))
		})
	}).catch((e) => {
		res.status(400).json({
			error: true,
			errors: errorgenerator(e.errors),
			data: []
		})
	});
});

//login
app.post('/api/login', (req, res) => {
	var body = _.pick(req.body, ['email', 'password'])
	User.findOne({ email: body.email, password: body.password }, function (err, docs) {
		if (err) {
			res.send(400)
		} if (docs) {
			var token = jwt.sign(_.pick(docs, ['email', 'createdAt', '_id']), 'dbbjqbdjbqjbdjqb');
			res.status(200).json({
				error: false,
				errors: [],
				data: token
			})
		} else {
			res.status(400).json({
				error: true,
				errors: [{
					msg: 'Email not exist'
				}],
				data: []
			})
		}
	});
});

//getallevents
app.get('/api/getevents', (req, res) => {
	Event.find(function (err, events) {
		if (err) {
			res.send(err)
		} else {
			res.status(200).json({
				error: false,
				errors: [],
				data: generatedata(events)
			})
		}
	})
});

//addevent
app.post('/api/addevent', upload.single('eventImage'), (req, res) => {
	console.log(req.file)
	var event = new Event({
		event_name: req.body.event_name,
		place: req.body.place,
		date: req.body.date,
		time: req.body.time,
		publishedBy: req.body.publishedBy,
		tags: req.body.tags,
		published: req.body.published,
		image: req.file.originalname
	});
	event.save().then((events) => {
		res.status(200).json({
			error: false,
			errors: [],
			data: generatedata(events)
		})
	}).catch((e) => {
		res.status(400).json({
			error: true,
			errors: errorgenerator(e.errors),
			data: []
		})
	});
});

//geteventdetails
app.get('/api/getevent/:id', (req, res) => {
	Event.findOne({ _id: req.params.id }, function (err, result) {
		if (err) {
			res.send(err);
		}
		else {
			res.status(200).json({
				error: false,
				errors: [],
				data: generatedata(result)
			})
		}
	});
});

//deleteevent
app.delete('/api/delevent/:id', (req, res) => {
	Event.remove({ _id: req.params.id }, function (err, result) {
		if (err) {
			res.send(err);
		}
		else {
			res.status(200).json({
				error: false,
				errors: [],
				data: generatedata(result)
			})
		}
	});
});

app.listen(process.env.PORT || 3000, () => {
	console.log("Listening at port 3000")
});


