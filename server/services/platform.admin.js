const PlatformStore = require("../stores/platform");
const UserStore = require("../stores/user");
const TeamDurationStatsStore = require("../stores/team-duration-stats");
const {
	ENUM_USER_TYPE,
} = require("../lib/enum");

async function setPlatformDividendSettings(dividendSettings) {
	const txn = UserStore.getTransaction();

	try {
		const users = await UserStore.getUsersByType(ENUM_USER_TYPE.ZHAOSHANG, {
			projections: UserStore.ID_ONLY_PROJECTIONS,
		});
		const userIds = users.map(({ id }) => id);

		const operations = async function (transaction) {
			await PlatformStore.updateDividendSettings(dividendSettings, { transaction });
			await TeamDurationStatsStore.updateTeamDurationStatsesWithinUserIdsAndDividendSettings(userIds, dividendSettings, { transaction });

			return dividendSettings;
		};

		await txn.startTransaction(operations);

		return txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

async function updatePlatformHigherFixedWage(fixedWage) {
	const txn = PlatformStore.getTransaction();

	try {
		const operations = async function (transaction) {
			await PlatformStore.updateFixedWage(fixedWage, { transaction });
			await UserStore.updateZhaoshangFixedWage(fixedWage, { transaction });
		};

		await txn.startTransaction(operations);

		return txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

async function updatePlatformLowerFixedWage(fixedWage) {
	const txn = PlatformStore.getTransaction();

	try {
		const operations = async function (transaction) {
			await PlatformStore.updateFixedWage(fixedWage, { transaction });
			await UserStore.updateFixedWageIfGreaterThan(fixedWage, { transaction });
		};

		await txn.startTransaction(operations);

		return txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

module.exports = {
	setPlatformDividendSettings,
	updatePlatformHigherFixedWage,
	updatePlatformLowerFixedWage,

	PLATFORM_PROJECTIONS: {
		UPDATE_FIXED_WAGE_REQUIRED: PlatformStore.UPDATE_FIXED_WAGE_REQUIRED_PROJECTIONS,
		CREATE_ZHAOSHANG_REQUIRED: PlatformStore.CREATE_ZHAOSHANG_REQUIRED_PROJECTIONS,
		BONUS: PlatformStore.BONUS_ONLY_PROJECTIONS,
		CREATE_STAFF_REQUIRED: PlatformStore.CREATE_STAFF_REQUIRED_PROJECTIONS,
	},
};
