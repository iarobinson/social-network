
const express = require('express'); // because this is an express app
const mongoose = require('mongoose'); // because we are dealing with database
const passport = require('passport'); // because we want to protect some routes

const router = express.Router(); // connect to router

// Post model
const Post = require('../../models/Posts');

// Bring in validation
const validatePostInput = require('../../validation/post');

// @route 	GET api/posts/test
// @desc 		Tests post route
// @access 	Public 
router.get('/test', (req, res) => res.json({msg: "Yo! posts.js Works!"}));

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

module.exports = router;
