const Joi = require("joi");
const { omit } = require("ljit-collection");
const {
	getTransaction,
	create,
	insertMany,
	upsert,
	find,
	getCursor,
} = require("../models/team-daily-stats");
const SQLWhereClauseBuilder = require("../lib/sequlize-query-builder/sql-where-clause-builder");
const { generateStatsDateString } = require("../lib/date");
const INCREMENT_TEAM_DURATION_STATS_REQUIRED_PROJECTIONS = [
	"userId", "username", "walletCode",
	"date", "bettingAmount", "bettingReward",
	"depositAmount", "withdrawalAmount", "rebateAmount",
	"activityAmount", "fixedWageAmount", "dividendAmount",
	"incentiveAmount",
];

function isUniqueKeyExisted(rows) {
	const schema = Joi.array().items(Joi.object({
		userId: Joi.number().integer().required(),
		walletCode: Joi.number().integer().required(),
		date: Joi.date().required(),
	}));

	const { error } = Joi.validate(rows, schema, { allowUnknown: true });

	return error === null;
}

function createTeamDailyStats(row, {
	transaction,
} = {}) {
	return create(row, {
		transaction,
	});
}

function bulkIncreaseBettingRelatedTeamDailyStatses(rows, {
	transaction,
} = {}) {
	if (!isUniqueKeyExisted(rows)) {
		throw new Error("userId, walletCode & date missing.");
	}

	return insertMany(rows, {
		updateOnDuplicate: ["updatedAt"],
		incrementOnDuplicate: [
			"bettingAmount",
			"bettingReward",
			"rebateAmount",
			"fixedWageAmount",
		],
		ignoreDuplicates: true,
		transaction,
	});
}

function bulkIncreaseTeamCommissionRelatedTeamDailyStatses(rows, {
	transaction,
} = {}) {
	if (!isUniqueKeyExisted(rows)) {
		throw new Error("userId, walletCode & date missing.");
	}

	return insertMany(rows, {
		updateOnDuplicate: ["updatedAt"],
		incrementOnDuplicate: [
			"rebateAmount",
			"fixedWageAmount",
		],
		ignoreDuplicates: true,
		transaction,
	});
}

function bulkIncreaseZhaoShangDividendsGrantedTeamDailyStatses(rows, {
	transaction,
} = {}) {
	if (!isUniqueKeyExisted(rows)) {
		throw new Error("userId, walletCode & date missing.");
	}

	return insertMany(rows, {
		updateOnDuplicate: ["updatedAt"],
		incrementOnDuplicate: [ "dividendAmount" ],
		ignoreDuplicates: true,
		transaction,
	});
}

function bulkIncreaseDepositRelatedTeamDailyStatses(rows, {
	transaction,
} = {}) {
	if (!isUniqueKeyExisted(rows)) {
		throw new Error("userId, walletCode & date missing.");
	}

	return insertMany(rows, {
		updateOnDuplicate: ["updatedAt"],
		incrementOnDuplicate: [
			"depositAmount",
		],
		ignoreDuplicates: true,
		transaction,
	});
}

function bulkIncreaseUserCreationRelatedTeamDailyStatses(rows, {
	transaction,
} = {}) {
	if (!isUniqueKeyExisted(rows)) {
		throw new Error("userId, walletCode & date missing.");
	}

	return insertMany(rows, {
		updateOnDuplicate: ["updatedAt"],
		incrementOnDuplicate: [ "numOfRegistries" ],
		ignoreDuplicates: true,
		transaction,
	});
}

function bulkUpdateBettingUserCountingRelatedTeamDailyStatses(rows, {
	transaction,
} = {}) {
	if (!isUniqueKeyExisted(rows)) {
		throw new Error("userId, walletCode & date missing.");
	}

	return insertMany(rows, {
		updateOnDuplicate: ["numOfBettingUsers", "numOfEffectiveBettingUsers", "updatedAt"],
		ignoreDuplicates: true,
		transaction,
	});
}

function increaseTeamDailyStatsByUserIdWalletCodeAndDate(userId, walletCode, date, row, {
	transaction,
} = {}) {
	const preparedTeamDailyStats = omit(row, ["userId", "walletCode", "date"]);
	const { username, ...incrementFields } = preparedTeamDailyStats;
	const dateString = generateStatsDateString(date);

	return upsert({
		userId,
		username,
		walletCode,
		date: dateString,
		...incrementFields,
	}, {
		fields: [ "updatedAt" ],
		incrementFields: Object.keys(incrementFields),
		transaction,
	});
}

function paginateTeamDailyStatsByDate(date, {
	projections,
} = {}) {
	const dateString = generateStatsDateString(date);

	return getCursor({
		where: {
			date: dateString,
		},
		attributes: projections,
	});
}

function getTeamDailyStatsWithinUserIdsWalletCodeAndDates(
	userIds,
	walletCode,
	from,
	to,
	{
		projections,
	} = {}
) {
	const userWhereClause = new SQLWhereClauseBuilder()
		.setIn("userId", userIds)
		.setEqual("walletCode", walletCode)
		.setGte("date", from)
		.setLte("date", to)
		.build();

	return find({
		where: userWhereClause,
		attributes: projections,
	});
}

module.exports = {
	getTransaction,
	createTeamDailyStats,
	bulkIncreaseBettingRelatedTeamDailyStatses,
	bulkIncreaseTeamCommissionRelatedTeamDailyStatses,
	bulkIncreaseZhaoShangDividendsGrantedTeamDailyStatses,
	bulkIncreaseDepositRelatedTeamDailyStatses,
	bulkIncreaseUserCreationRelatedTeamDailyStatses,
	bulkUpdateBettingUserCountingRelatedTeamDailyStatses,
	increaseTeamDailyStatsByUserIdWalletCodeAndDate,
	paginateTeamDailyStatsByDate,
	getTeamDailyStatsWithinUserIdsWalletCodeAndDates,

	INCREMENT_TEAM_DURATION_STATS_REQUIRED_PROJECTIONS,
};
