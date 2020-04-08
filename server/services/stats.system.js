const TeamBonusStatsStore = require("../stores/team-bonus-stats");
const UserBonusLogStore = require("../stores/user-bonus-log");
const RelationshipStore = require("../stores/relationship");
const UserDailyStatsStore = require("../stores/user-daily-stats");
const TeamDailyStatsStore = require("../stores/team-daily-stats");
const TeamStatsStore = require("../stores/team-stats");
const WalletStore = require("../stores/wallet");
const {
	ENUM_WALLET_CODE,
} = require("../lib/enum");
const {
	convertUserDailyStatsesToBettingUserCountingRelatedTeamDailyStatses,
} = require("../lib/stats-helpers");
const {
	sumBy,
	pullAll,
} = require("ljit-collection");
const {
	NotFoundError,
} = require("ljit-error");
const {
	WALLET_NOT_FOUND,
} = require("../lib/error/code");

async function doSeriesTeamBonusStats() {
	const userBonusLogs = [];

	do {
		try {
			const userBonusLog = await UserBonusLogStore.getEarliestUserBonusLog();

			if (userBonusLog === null) {
				break;
			}

			await doTeamBonusStats(userBonusLog);

			userBonusLogs.push(userBonusLog);
		} catch (error) {
			throw error;
		}
	} while (true);

	return userBonusLogs;
}

async function doTeamBonusStats(userBonusLog) {
	const txn = TeamBonusStatsStore.getTransaction();

	try {
		const {
			userId,
			previousDeltaBonus,
			updatedDeltaBonus,
		} = userBonusLog;

		const ancestors = await RelationshipStore.getAncestorAndMeRelationshipsByUserId(userId, {
			projections: RelationshipStore.ANCESTOR_PROJECTIONS,
		});

		const preparedTeamBonusStatses = ancestors.reduce((accumulator, ancestor) => {
			accumulator.push({
				userId: ancestor.id,
				username: ancestor.username,
				deltaBonus: previousDeltaBonus,
				numOfUsers: -1,
			}, {
				userId: ancestor.id,
				username: ancestor.username,
				deltaBonus: updatedDeltaBonus,
				numOfUsers: 1,
			});

			return accumulator;
		}, []);

		const operations = async (transaction) => {
			await TeamBonusStatsStore.bulkIncreaseTeamBonusStatses(preparedTeamBonusStatses, { transaction });
			await UserBonusLogStore.deleteUserBonusLogById(userBonusLog.id, { transaction });
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

async function doTeamStats({ date, platform }) {
	const walletCode = ENUM_WALLET_CODE.PRIMARY;
	let teamDailyStatses = [];
	let teamStatses = [];

	try {
		const userDailyStatses = await UserDailyStatsStore.getUserDailyStatsesWithAncestorRelationshipsByDateAndWalletCode(
			date,
			walletCode,
			{
				projections: [
					"userId", "username", "walletCode",
					"date", "bettingAmount",
				],
			}
		);

		if (!userDailyStatses.length) {
			return {
				teamDailyStatses,
				teamStatses,
			};
		}

		teamDailyStatses = await doBettingUserCountingRelatedTeamDailyStatses({ userDailyStatses, platform });
		teamStatses = await doBalanceRelatedTeamStatses({ walletCode, userDailyStatses });

		return {
			teamDailyStatses,
			teamStatses,
		};
	} catch (error) {
		throw error;
	}
}

async function doBettingUserCountingRelatedTeamDailyStatses({ userDailyStatses, platform }) {
	const preparedTeamDailyStatses = convertUserDailyStatsesToBettingUserCountingRelatedTeamDailyStatses(userDailyStatses, platform.effectiveBettingAmountPerDay);

	await TeamDailyStatsStore.bulkUpdateBettingUserCountingRelatedTeamDailyStatses(preparedTeamDailyStatses);

	return preparedTeamDailyStatses;
}

async function doBalanceRelatedTeamStatses({ walletCode, userDailyStatses }) {
	const teamStatses = [];

	for (let i = 0, { length } = userDailyStatses; i < length; i++) {
		const teamStats = await updateBalanceRelatedTeamStatsBasedOnChildrenTeamStatsesByUserIdAndWalletCode(userDailyStatses[i].userId, walletCode);

		teamStatses.push(teamStats);
	}

	const ancestorIds = getTeamStatsAffectedAncestorIds({ userDailyStatses });

	for (let i = 0, { length } = ancestorIds; i < length; i++) {
		const teamStats = await updateBalanceRelatedTeamStatsBasedOnChildrenTeamStatsesByUserIdAndWalletCode(ancestorIds[i], walletCode);

		teamStatses.push(teamStats);
	}

	return teamStatses;
}

async function updateBalanceRelatedTeamStatsBasedOnChildrenTeamStatsesByUserIdAndWalletCode(userId, walletCode) {
	const wallet = await WalletStore.getWalletByUserIdAndWalletCode(userId, walletCode, { projections:  WalletStore.BALANCE_ONLY_PROJECTIONS });

	if (wallet === null) {
		throw new NotFoundError(
			WALLET_NOT_FOUND.MESSAGE,
			WALLET_NOT_FOUND.CODE
		);
	}

	const children = await RelationshipStore.getChildrenRelationshipsByUserId(userId, { projections: RelationshipStore.USERID_ONLY_PROJECTIONS });

	const childernIds = children.map(child => child.userId);

	const childrenTeamStatses = await TeamStatsStore.getTeamStatsesWithinUserIdAndWalletCode(childernIds, walletCode, {
		projections: TeamStatsStore.BALANCE_RELATED_PROJECTIONS,
	});

	const preparedTeamStats = {
		userId,
		walletCode,
		balance: sumBy(childrenTeamStatses, "balance"),
		numOfZeroBalanceUsers: sumBy(childrenTeamStatses, "numOfZeroBalanceUsers"),
		numOfNonZeroBalanceUsers: sumBy(childrenTeamStatses, "numOfNonZeroBalanceUsers"),
	};

	if (wallet.balance > 0) {
		preparedTeamStats.balance += wallet.balance;
		preparedTeamStats.numOfNonZeroBalanceUsers += 1;
	} else {
		preparedTeamStats.numOfZeroBalanceUsers += 1;
	}

	await TeamStatsStore.updateBalanceRelatedTeamStatsByUserIdAndWalletCode(userId, walletCode, preparedTeamStats);

	return preparedTeamStats;
}

function getTeamStatsAffectedAncestorIds({ userDailyStatses }) {
	const userIds = userDailyStatses.map(({ userId }) => userId);
	const set = new Set();

	userDailyStatses.forEach(userDailyStats => {
		userDailyStats.ancestors.forEach(ancestor => set.add(ancestor.id));
	});

	const ancestorIds = [ ...set ];

	return pullAll(ancestorIds, userIds);
}

module.exports = {
	doSeriesTeamBonusStats,
	doTeamStats,
};
