const {
	isSameTime,
} = require("ljit-lib/moment-utils");
const {
	AuthenticationError,
} = require("ljit-error");
const {
	USER_LOGIN_PASSWORD_IS_MODIFIED,
} = require("../../../../lib/error/code");

module.exports = function isLoginPasswordUpdated(req, res, next) {
	const { loginPasswordUpdatedAt: previousLoginPasswordUpdatedAt } = req.user;
	const { loginPasswordUpdatedAt: currentLoginPasswordUpdatedAt } = res.locals.user;

	if (!isSameTime(previousLoginPasswordUpdatedAt, currentLoginPasswordUpdatedAt)) {
		req.logout();

		return next(new AuthenticationError(
			USER_LOGIN_PASSWORD_IS_MODIFIED.MESSAGE,
			USER_LOGIN_PASSWORD_IS_MODIFIED.CODE
		));
	}

	next();
};
