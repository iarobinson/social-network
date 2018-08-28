const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creat Schema
const UserSchema = new Schema({
	// What is our User collection going to be made of?
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	avatar: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = User = mongoose.model('users', UserSchema);