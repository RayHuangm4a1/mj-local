const { ForbiddenError } = require("ljit-error");
const {
	ZHAOSHANG_IS_NOT_BETABLE,
	USER_IS_NOT_BETABLE,
} = require("../lib/error/code");

const REBATE_PRECISION_MAX = 1;

function validateIsUserBetable(req, res, next) {
	const { isZhaoShangBetable } = res.locals.platform.bettingPolicy;

	if (!isZhaoShangBetable && res.locals.user.isZhaoShang()) {
		const error = new ForbiddenError(ZHAOSHANG_IS_NOT_BETABLE.MESSAGE, ZHAOSHANG_IS_NOT_BETABLE.CODE);

		return next(error);
	}

	if (!res.locals.user.isBetable()) {
		const error = new ForbiddenError(USER_IS_NOT_BETABLE.MESSAGE, USER_IS_NOT_BETABLE.CODE);

		return next(error);
	}

	next();
}

module.exports = {
	validateIsUserBetable,

	REBATE_PRECISION_MAX,
};
