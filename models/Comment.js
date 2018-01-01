var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
	text: {
		type: String,
	}
})
const Comment = mongoose.model('Comment', commentSchema);
module.exports = { Comment }