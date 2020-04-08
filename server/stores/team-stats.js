const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {
	create,
	increment,
	findOne,
	find,
	update,
} = require("../models/team-stats");
const {
	ENUM_WALLET_CODE,
} = require("../lib/enum");
const {
	generateStatsDateString,
} = require("../lib/date");
const TeamBonusStatsModel = require("../models/team-bonus-stats");
const TeamDailyStatsModel = require("../models/team-daily-stats");
const BALANCE_RELATED_PROJECTIONS = [
	"numOfZeroBalanceUsers",
	"numOfNonZeroBalanceUsers",
	"balance",
];

function createTeamStats(row, {
	transaction,
} = {}) {
	return create(row, { transaction });
}

function increaseNumOfUsersWithinUserIdsAndWalletCode(userIds, walletCode, {
	transaction,
} = {}) {
	return increment({
		numOfUsers: 1,
	}, {
		where: {
			userId: {
				[Op.in]: userIds,
			},
			walletCode,
		},
		transaction,
	});
}

function getTeamStatsByUserIdAndWalletCode(userId, walletCode, {
	projections
} = {}) {
	return findOne({
		where: {
			userId,
			walletCode,
		},
		attributes: projections,
	});
}

async function getTeamStatsWithBonusStatsAndDailyStatsByUserIdAndWalletCode(userId, walletCode, {
	projections
} = {}) {
	const teamStatses = await find({
		where: {
			userId,
			walletCode,
		},
		include: [
			{
				model: TeamBonusStatsModel.getInstance(),
				attributes: ["deltaBonus", "numOfUsers"],
				as: "teamBonusStatses",
				required: false,
			},
			{
				model: TeamDailyStatsModel.getInstance(),
				where: {
					walletCode,
				},
				attributes: ["date", "numOfRegistries", "numOfBettingUsers", "numOfEffectiveBettingUsers"],
				as: "teamDailyStatses",
				required: false,
				limit: 10,
				separate: true,
				order: [["date", "desc"]],
			},
		],
		raw: false,
		subQuery: false,
		attributes: projections,
	});

	if (!teamStatses.length) {
		return null;
	}

	const teamStats = teamStatses[0].toJSON();

	teamStats.today = generateStatsDateString(new Date());

	return teamStats;
}

function getTeamStatsesWithinUserIdAndWalletCode(userIds, walletCode, {
	projections,
} = {}) {
	return find({
		where: {
			userId: {
				[Op.in]: userIds,
			},
			walletCode,
		},
		attributes: projections,
	});
}

function updateBalanceRelatedTeamStatsByUserIdAndWalletCode(userId, walletCode, {
	numOfZeroBalanceUsers, numOfNonZeroBalanceUsers, balance,
}) {
	return update({
		numOfZeroBalanceUsers, numOfNonZeroBalanceUsers, balance,
	}, {
		where: {
			userId,
			walletCode,
		},
	});
}

module.exports = {
	createTeamStats,
	increaseNumOfUsersWithinUserIdsAndWalletCode,
	getTeamStatsByUserIdAndWalletCode,
	getTeamStatsWithBonusStatsAndDailyStatsByUserIdAndWalletCode,
	getTeamStatsesWithinUserIdAndWalletCode,
	updateBalanceRelatedTeamStatsByUserIdAndWalletCode,

	BALANCE_RELATED_PROJECTIONS,
};
