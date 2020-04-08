const {
	ConflictError,
} = require("ljit-error");
const {
	USER_DEFAULT_PASSWORD_ALREADY_CHANGED,
} = require("../../../../lib/error/code");

module.exports = function isDefaultPasswordNotChanged(req, res, next) {
	if (!res.locals.account.loginCredential.isDefault) {
		return next(new ConflictError(
			USER_DEFAULT_PASSWORD_ALREADY_CHANGED.MESSAGE,
			USER_DEFAULT_PASSWORD_ALREADY_CHANGED.CODE
		));
	}

	next();
};
