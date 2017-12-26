var mongoose = require('mongoose');
let beautifyUnique = require('mongoose-beautiful-unique-validation');
var todoSchema = mongoose.Schema({
  text:{
  	type:String,
  	require:true,
  	minlength:1,
  	trim:true
  },
  completed:{
  	type:Boolean,
  	default:false
  },
  completedAt:{
  	type:Number,
  	default:null
  }
})
userSchema.plugin(beautifyUnique);
const Todo = mongoose.model('Todo', todoSchema);
module.exports = {Todo}