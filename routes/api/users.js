const express = require('express');
const router = express.Router();

// Load the User Model
const User = require('../models/User.js');

// @route 	GET api/users/test
// @desc 		Tests post route
// @access 	Public 
router.get('/test', (req, res) => res.json({msg: "Yo! users.js Works!"}));

// @route 	GET api/users/register
// @desc 		Register user
// @access 	Public 
router.post('/register', (req, res) => 
	// now we can use any Mongoose commands
	User.findOne( { email: req.body.email })
		.then(user => {
			if (user) {
				return res.status(400).json({ email: 'Email Already Recorded' });
			} else {
				const newUser = new User({
					name: req.body.name,
					email: req.body.email,
					avatar: // Add Gravatar Here...,
					password: req.body.password,
				});
			}
		})
	res.json({msg: "Yo! users.js Works!"})
);

module.exports = router;