const {
	ForbiddenError,
} = require("ljit-error");
const {
	USER_LEVEL_IS_NOT_MATCHED_BANK_ACCOUNT,
} = require("../../../../lib/error/code");

module.exports = function isUserLevelMatchedBankAccount(req, res, next) {
	const { levels } = res.locals.bankAccountWithLevels;
	const { levelId } = res.locals.user;

	try {
		const level = levels.find(({ id }) => id === levelId);

		if (level === undefined) {
			throw new ForbiddenError(USER_LEVEL_IS_NOT_MATCHED_BANK_ACCOUNT.MESSAGE, USER_LEVEL_IS_NOT_MATCHED_BANK_ACCOUNT.CODE);
		}
	} catch (error) {
		return next(error);
	}

	next();
};
