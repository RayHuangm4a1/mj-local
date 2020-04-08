const {
	ForbiddenError,
} = require("ljit-error");
const {
	USER_IS_NOT_TRANSFERABLE,
} = require("../../../../lib/error/code");

module.exports = function isTransferable(req, res, next) {
	if (!res.locals.user.isTransferable()) {
		return next(new ForbiddenError(USER_IS_NOT_TRANSFERABLE.MESSAGE, USER_IS_NOT_TRANSFERABLE.CODE));
	}

	next();
};
