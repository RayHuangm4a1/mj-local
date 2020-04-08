const {
	ForbiddenError,
} = require("ljit-error");
const {
	FIXED_WAGE_INPUT_NOT_IN_WHITELIST,
	FIXED_WAGE_INPUT_LESS_THAN_EQUAL_CURRENT,
	FIXED_WAGE_INPUT_GREATER_THAN_PARENT,
} = require("../../../../lib/error/code");

module.exports = function validateChildrenFixedWageRange(req, res, next) {
	const { fixedWages } = res.locals.platform;
	const { fixedWage: parentFixedWage } = res.locals.user;
	const { fixedWage: childrenFixedWage } = res.locals.user.descendants[0];
	const { fixedWage } = req.body;

	try {
		if (!fixedWages.includes(fixedWage)) {
			throw new ForbiddenError(
				FIXED_WAGE_INPUT_NOT_IN_WHITELIST.MESSAGE,
				FIXED_WAGE_INPUT_NOT_IN_WHITELIST.CODE
			);
		}

		if (fixedWage <= childrenFixedWage) {
			throw new ForbiddenError(
				FIXED_WAGE_INPUT_LESS_THAN_EQUAL_CURRENT.MESSAGE,
				FIXED_WAGE_INPUT_LESS_THAN_EQUAL_CURRENT.CODE
			);
		}

		if (fixedWage > parentFixedWage) {
			throw new ForbiddenError(
				FIXED_WAGE_INPUT_GREATER_THAN_PARENT.MESSAGE,
				FIXED_WAGE_INPUT_GREATER_THAN_PARENT.CODE
			);
		}
	} catch (error) {
		return next(error);
	}

	next();
};
