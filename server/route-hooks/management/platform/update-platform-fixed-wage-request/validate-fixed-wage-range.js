const {
	ForbiddenError,
} = require("ljit-error");
const {
	PLATFORM_FIXED_WAGE_INPUT_NOT_IN_WHITELIST,
} = require("../../../../lib/error/code");

module.exports = function validateChildrenFixedWageRange(req, res, next) {
	const { fixedWages } = res.locals.platform;
	const { fixedWage } = req.body;

	try {
		if (!fixedWages.includes(fixedWage)) {
			throw new ForbiddenError(
				PLATFORM_FIXED_WAGE_INPUT_NOT_IN_WHITELIST.MESSAGE,
				PLATFORM_FIXED_WAGE_INPUT_NOT_IN_WHITELIST.CODE
			);
		}
	} catch (error) {
		return next(error);
	}

	next();
};
