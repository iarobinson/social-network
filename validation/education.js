
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
	let errors = {};

	// If undefined or null, turn it to an empty string
	data.school = !isEmpty(data.school) ? data.school : "";
	data.degree = !isEmpty(data.degree) ? data.degree : "";
	data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
	data.from = !isEmpty(data.from) ? data.from : "";

	if (Validator.isEmpty(data.school)) {
		errors.school = 'School field is required';
	}

	if (Validator.isEmpty(data.degree)) {
		errors.degree = 'Degree field is required';
	}

	// Ensure email is valid
	if (Validator.isEmpty(data.fieldofstudy)) {
		errors.fieldofstudy = 'Field of Study is required';
	}

	// Ensure email is valid
	if (Validator.isEmpty(data.from)) {
		errors.from = 'From date field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}
