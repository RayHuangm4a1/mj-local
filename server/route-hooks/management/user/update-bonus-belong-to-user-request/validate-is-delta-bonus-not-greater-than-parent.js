const {
	ForbiddenError,
} = require("ljit-error");
const {
	USER_BONUS_GREATER_THAN_PARENT,
	USER_BONUS_EQUAL_TO_BEFORE,
	ROOT_COULD_NOT_MODIFIED,
} = require("../../../../lib/error/code");

module.exports = async function validateIsDeltaBonusNotGreaterThanParent(req, res, next) {
	const { preparedDeltaBonus } = res.locals;
	const { managedUser } = res.locals;

	try {
		if (managedUser.isRoot()) {
			throw new ForbiddenError(
				ROOT_COULD_NOT_MODIFIED.MESSAGE,
				ROOT_COULD_NOT_MODIFIED.CODE
			);
		}

		const { deltaBonus: parentDeltaBonus } = managedUser.ancestors[0];

		if (preparedDeltaBonus > parentDeltaBonus) {
			throw new ForbiddenError(
				USER_BONUS_GREATER_THAN_PARENT.MESSAGE,
				USER_BONUS_GREATER_THAN_PARENT.CODE
			);
		}

		if (preparedDeltaBonus === managedUser.deltaBonus) {
			throw new ForbiddenError(
				USER_BONUS_EQUAL_TO_BEFORE.MESSAGE,
				USER_BONUS_EQUAL_TO_BEFORE.CODE
			);
		}
	} catch (error) {
		return next(error);
	}

	next();
};
