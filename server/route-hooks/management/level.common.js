const {
	ForbiddenError,
	NotFoundError,
} = require('ljit-error');
const {
	USER_LEVEL_EQUAL_TO_BEFORE,
	LEVEL_NOT_FOUND,
} = require('../../lib/error/code');
const {
	getActiveLevelById,
} = require('../../services/level.admin');

async function isValidLevelId(req, res, next) {
	const { levelId } = req.params;
	const { managedUser } = res.locals;

	try {
		if (levelId === managedUser.levelId) {
			throw new ForbiddenError(
				USER_LEVEL_EQUAL_TO_BEFORE.MESSAGE,
				USER_LEVEL_EQUAL_TO_BEFORE.CODE
			);
		}

		const level = await getActiveLevelById(levelId);

		if (level === null) {
			throw new NotFoundError(
				LEVEL_NOT_FOUND.MESSAGE,
				LEVEL_NOT_FOUND.CODE
			);
		}
	} catch (error) {
		return next(error);
	}

	next();
}

module.exports = {
	isValidLevelId,
};
