const {
	ForbiddenError,
} = require("ljit-error");
const {
	USER_IS_NOT_WITHDRAWABLE,
} = require("../../../../lib/error/code");

module.exports = function isUserWithdrawable(req, res, next) {
	if (!res.locals.user.isWithdrawable()) {
		return next(new ForbiddenError(USER_IS_NOT_WITHDRAWABLE.MESSAGE, USER_IS_NOT_WITHDRAWABLE.CODE));
	}

	next();
};
