
const express = require('express'); // because this is an express app
const mongoose = require('mongoose'); // because we are dealing with database
const passport = require('passport'); // because we want to protect some routes

const router = express.Router(); // connect to router

// Bring in Models
const Post = require('../../models/Posts');
const Profile = require('../../models/Profile');

// Bring in validation
const validatePostInput = require('../../validation/post');

// @route 	GET api/posts/test
// @desc 		Tests post route
// @access 	Public 
router.get('/test', (req, res) => res.json({msg: "Yo! posts.js Works!"}));

// @route 	GET api/posts
// @desc 		Gets posts
// @access 	Public 
router.get('/', (req, res) => {
	Post.find()
		.sort({date: -1})
		.then(posts => res.json(posts))
		.catch(err => res.status(404).json({ nopostsfound: "No posts found with that id"}));
});

// @route 	GET api/posts/:id
// @desc 		Gets post by id
// @access 	Public 
router.get('/:id', (req, res) => {
	Post.findById(req.params.id)
		.then(post => res.json(post))
		.catch(err => res.status(404).json({ nopostfound: "No post found with that id"}));
});

// @route 	GET api/posts
// @desc 		Create post
// @access 	Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validatePostInput(req.body);

	// Check validation
	if (!isValid) {
		// If errors, we send 400 with errors object
		return res.status(400).json(errors);
	}

	const newPost = new Post({
		text: req.body.text,
		name: req.body.name,
		avatar: req.body.avatar,
		user: req.user.id,
	});

	newPost.save().then(post => res.json(post));
});

// @route 	DELETE api/posts/:id
// @desc 		Delete post
// @access 	Private 
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id })
		.then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					// Check that the owner of the post is calling for the delte
					if (post.user.toString() !== req.user.id) {
						return res.status(401).json({ notauthorized: "User not authorized" }); // 401 Authorization status error
					}
					
					// Delete
					post.remove().then(() => res.json({ success: true, postdeleted: "Your post has been deleted" }));
				})
				.catch(err => res.status(404).json({ postnotfound: 'No post found'}))
		})
		.catch(err => res.status(404).json({ nopostfound: "No post found with that id"}));
});

module.exports = router;
