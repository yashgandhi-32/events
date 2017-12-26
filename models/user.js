const mongoose = require('mongoose');
const validator = require('validator');

var userSchema = mongoose.Schema({
	email: {
		type: String,
		required: [true, "Email cant be left blank"],
		trim: true,
		minlength: 1
	},
	password: {
		type: String,
		required: [true, "Password cant be left blank"],
		validate: {
			validator: (value) => {
				if (value.length < 6) {
					return false;
				} else
					return true;
			},
			message: 'Password length must be minimum 6 characters long'
		}
	},
	name:{
		type:String,
		required:true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
})
userSchema.methods.generateToken = function () {
	var user = this;
	var access = 'auth';
	var token = jwt.sign({ _id: user._id.toHexString(), access }, 'gnekgnegweerjg').toString();
	user.tokens.push({ access, token })
	return user.save().then(() => {
		return token;
	})
}
userSchema.path('email').validate(function (value, respond) {
	if (validator.isEmail(value)) {
		return respond(true)
	}
	return respond(false)
}, "Email is invalid");
userSchema.path('email').validate(function (value, respond) {
	var self = this;
	this.constructor.findOne({ email: value }, function (err, user) {
		if (err) {
			return respond(false);
		}
		if (user) {
			if (self.id === user.id) {
				return respond(true);
			}
			return respond(false);
		}
		respond(true);
	});
}, 'Email Already exists');

const User = mongoose.model('User', userSchema);
module.exports = { User }