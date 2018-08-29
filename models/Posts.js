const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	text: {
		type: String,
		required: true
	},
	name: {
		type: String
	},
	avatar: {
		type: String
	},
	likes: [
		{ // Make likes an array of user objects
			user: {
				type: Schema.Type.ObjectId,
				ref: 'users'
			}
		}
	],
	comments: [
		{ // Make likes an array of user objects
			user: {
				type: Schema.Type.ObjectId,
				ref: 'users'
			},
			text: {
				type: String,
				required: true
			},
			name: {
				type: String
			},
			avatar: {
				type: String
			},
			date: {
				type: Date,
				default: Date.now
			}
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Post = mongoose.model('post', postSchema)