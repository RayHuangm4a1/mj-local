const {
	ForbiddenError,
} = require("ljit-error");
const {
	USER_IS_NOT_DEPOSITABLE,
} = require("../../../../lib/error/code");

module.exports = function isUserDepositable(req, res, next) {
	if (!res.locals.user.isDepositable()) {
		return next(new ForbiddenError(USER_IS_NOT_DEPOSITABLE.MESSAGE, USER_IS_NOT_DEPOSITABLE.CODE));
	}

	next();
};
