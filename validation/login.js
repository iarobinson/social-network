
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
	let errors = {};

	data.email = !isEmpty(data.email) ? data.email : "";
	data.password = !isEmpty(data.password) ? data.password : "";

	// Ensure email is valid
	if (!Validator.isEmail(data.email)) {
		errors.email = 'Email format invalid';
	}

	// Ensure passsword is between 2 and 30 characters in length
	if (!Validator.isLength(data.password, { min:6, max: 30 })) {
		errors.password = 'Password must be at least 6 characters';
	}

	// Ensure the password is not empty
	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}
	
	// Ensure email is valid
	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}
