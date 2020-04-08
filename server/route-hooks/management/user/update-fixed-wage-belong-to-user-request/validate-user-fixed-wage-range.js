const {
	ForbiddenError,
} = require("ljit-error");
const {
	USER_FIXED_WAGE_INPUT_NOT_IN_WHITELIST,
	USER_FIXED_WAGE_INPUT_GREATER_THAN_PARENT,
	USER_FIXED_WAGE_EQUAL_TO_BEFORE,
	ROOT_COULD_NOT_MODIFIED,
} = require("../../../../lib/error/code");

module.exports = async function validateUserFixedWageRange(req, res, next) {
	const { fixedWages: platformFixedWages } = res.locals.platform;
	const { managedUser } = res.locals;
	const { fixedWage } = req.body;

	try {
		if (!platformFixedWages.includes(fixedWage)) {
			throw new ForbiddenError(
				USER_FIXED_WAGE_INPUT_NOT_IN_WHITELIST.MESSAGE,
				USER_FIXED_WAGE_INPUT_NOT_IN_WHITELIST.CODE
			);
		}

		if (managedUser.isRoot()) {
			throw new ForbiddenError(
				ROOT_COULD_NOT_MODIFIED.MESSAGE,
				ROOT_COULD_NOT_MODIFIED.CODE
			);
		}

		const { fixedWage: parentFixedWage } = managedUser.ancestors[0];

		if (fixedWage > parentFixedWage) {
			throw new ForbiddenError(
				USER_FIXED_WAGE_INPUT_GREATER_THAN_PARENT.MESSAGE,
				USER_FIXED_WAGE_INPUT_GREATER_THAN_PARENT.CODE
			);
		}

		if (fixedWage === managedUser.fixedWage) {
			throw new ForbiddenError(
				USER_FIXED_WAGE_EQUAL_TO_BEFORE.MESSAGE,
				USER_FIXED_WAGE_EQUAL_TO_BEFORE.CODE
			);
		}
	} catch (error) {
		return next(error);
	}

	next();
};
