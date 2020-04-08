const LevelStore = require("../stores/level");
const Sequelize = require("sequelize");
const {
	NotFoundError,
	ForbiddenError,
	ConflictError,
} = require("ljit-error");
const {
	LEVEL_NOT_FOUND,
	LEVEL_DUPLICATED,
	MEMBERS_IN_LEVEL_COULD_NOT_ARCHIVE,
} = require("../lib/error/code");
const {
	ENUM_FINANCIAL_LEVEL_STATUS,
} = require("../lib/enum");

async function updateLevelById(id, row) {
	try {
		if (row.status === ENUM_FINANCIAL_LEVEL_STATUS.ARCHIVED) {
			const result = await LevelStore.updateLevelIfWithoutUsersById(id, row);

			if (result === null || result.affectedRows !== 1) {
				throw new ForbiddenError(
					MEMBERS_IN_LEVEL_COULD_NOT_ARCHIVE.MESSAGE,
					MEMBERS_IN_LEVEL_COULD_NOT_ARCHIVE.CODE
				);
			}
		} else {
			const result = await LevelStore.updateLevelById(id, row);

			if (result === null || result.affectedRows !== 1) {
				throw new NotFoundError(LEVEL_NOT_FOUND.MESSAGE, LEVEL_NOT_FOUND.CODE);
			}
		}
	} catch (error) {
		if (error instanceof Sequelize.UniqueConstraintError) {
			throw new ConflictError(LEVEL_DUPLICATED.MESSAGE, LEVEL_DUPLICATED.CODE);
		}

		throw error;
	}
}

module.exports = {
	getLevels: LevelStore.getLevels,
	getLevelById: LevelStore.getLevelById,
	getActiveLevelById: LevelStore.getActiveLevelById,
	updateLevelById,

	LEVEL_PROJECTIONS: {
		NUM_OF_USERS: LevelStore.NUM_OF_USERS_ONLY_PROJECTIONS,
	},
};
