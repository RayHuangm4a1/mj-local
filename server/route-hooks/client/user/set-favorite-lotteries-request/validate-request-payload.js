const {
	RequestValidationError,
} = require('ljit-error');
const {
	USER_INVALID_REQUEST,
} = require('../../../../lib/error/code');

module.exports = function validateRequestPayload(req, res, next) {
	req.checkBody().isLimitLengthArray({ min: 0, max: 100 });
	req.checkBody().isUniqueArrayItems();
	req.checkBody('*').isSQLId();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(USER_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};
