
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// Load the User Model
const User = require('../../models/User');

// @route 	GET api/users/test
// @desc 		Tests post route
// @access 	Public 
router.get('/test', (req, res) => {
	res.json({msg: "Yo! users.js Works!"})
});

// @route 	GET api/users/register
// @desc 		Register user
// @access 	Public
router.post('/register', (req, res) => {
	// now we can use any Mongoose commands
	User.findOne( { email: req.body.email })
		.then(user => {
			if (user) {
				return res.status(400).json({ email: 'Email already recorded' });
			} else {
				console.log("req.body.email =>", req.body.email);
				const avatar = gravatar.url(req.body.email, {
					s: '200', // Size of avatar image
					r: 'pg', // PG R Etc, the rating of your Gravatar
					d: 'mm', // Default... ummm... Why is this here? Related to gravatar documentation
				});
				
				const newUser = new User({
					name: req.body.name,
					email: req.body.email,
					avatar,
					password: req.body.password,
				});

				// Save the User password as a hash for security
				bcrypt.genSalt(10, (err, salt) => {
					// console.log(newUser.password, "<- newUser.password");
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						console.log('In post register', err);
						if (err) throw err;
						newUser.password = hash;
						newUser.save()
							.then(user => res.json(user))
							.catch(err => console.log(err));
					});
				});
			}
		});
});

// @route 	GET api/users/login
// @desc 		Login User / Returning JWT Token
// @access 	Public 
router.post('/login', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	// Find user by email
	User.findOne({email: email})
		.then(user => {
			// Check for user
			if (!user) {
				return res.status(404).json({email: `User not found`})
			}
			
			// Check Password - User input is plain text, in database we have hashed version
			bcrypt.compare(password, user.password)
				.then(isMatch => {
					if (isMatch) {
						res.json({msg: "Success"});
					} else {
						return res.status(400).json({password: 'Incorrect Password'});
					}
				});
		});
});

module.exports = router;