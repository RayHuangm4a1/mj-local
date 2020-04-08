const { ForbiddenError } = require("ljit-error");
const { USER_DEFAULT_PASSWORD_IS_NOT_CHANGED } = require("../../../../lib/error/code");

module.exports = function isDefaultPasswordChanged(req, res, next) {
	if (res.locals.account.loginCredential.isDefault) {
		return next(new ForbiddenError(
			USER_DEFAULT_PASSWORD_IS_NOT_CHANGED.MESSAGE,
			USER_DEFAULT_PASSWORD_IS_NOT_CHANGED.CODE
		));
	}

	next();
};
