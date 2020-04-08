const {
	ForbiddenError,
	NotFoundError,
} = require("ljit-error");
const {
	USER_NOT_FOUND,
	USER_IS_BLOCKED,
	USER_IS_NOT_FUNDSABLE,
} = require("../lib/error/code");
const {
	USER_PROJECTIONS,

	getUserById,
} = require("../services/user");

function prepareActiveUser(projections = USER_PROJECTIONS.MIN) {
	return async function (req, res, next) {
		try {
			const user = await getUserById(req.user.id, { projections });

			if (user === null) {
				throw new NotFoundError(USER_NOT_FOUND.MESSAGE, USER_NOT_FOUND.CODE);
			}

			if (user.isBlocked()) {
				throw new ForbiddenError(USER_IS_BLOCKED.MESSAGE, USER_IS_BLOCKED.CODE);
			}

			res.locals.user = user;
		} catch (error) {
			return next(error);
		}

		next();
	};
}

function isUserFundsable(req, res, next) {
	if (!res.locals.user.isFundsable()) {
		return next(new ForbiddenError(USER_IS_NOT_FUNDSABLE.MESSAGE, USER_IS_NOT_FUNDSABLE.CODE));
	}

	next();
}

module.exports = {
	prepareActiveUser,
	isUserFundsable,
};
