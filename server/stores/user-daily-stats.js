const { omit } = require("ljit-collection");
const Sequelize = require("sequelize");
const { Op, fn, col, } = Sequelize;
const {
	create,
	find,
	findOne,
	upsert,
} = require("../models/user-daily-stats");
const RelationshipModel = require("../models/relationship");
const {
	generateStatsDateString,
	generateStatsDateStringBeforeNDays,
} = require("../lib/date");
const {
	ROOT_USER_ID,
} = require("../lib/user");
const WITHDRAWAL_CREATION_REQUIRED_PROJECTIONS = [
	"withdrawalAmount", "numOfWithdrawals",
];
const BETTING_PROFIT_PROJECTIONS = [
	"bettingReward", "bettingAmount",
];
const TRANSFER_AMOUNT_ONLY_PROJECTIONS = ["transferAmount"];

function createUserDailyStats(row, {
	transaction,
} = {}) {
	return create(row, {
		transaction,
	});
}

function increaseUserDailyStatsByUserIdWalletCodeAndDate(userId, walletCode, date, row, {
	transaction,
} = {}) {
	const preparedUserDailyStats = omit(row, ["userId", "walletCode", "date"]);
	const { username, ...incrementFields } = preparedUserDailyStats;
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

function getUserDailyStatsByUserIdWalletCodeAndDates(userId, walletCode, from, to, {
	projections,
} = {}) {
	return find({
		where: {
			userId,
			walletCode,
			date: {
				[Op.gte]: from,
				[Op.lte]: to,
			}
		},
		attributes: projections,
	});
}

function getTodayUserDailyStatsByUserIdWalletCode(userId, walletCode, {
	projections,
} = {}) {
	const currentDateString = generateStatsDateString(new Date);

	return findOne({
		where: {
			userId,
			walletCode,
			date: currentDateString,
		},
		attributes: projections,
	});
}

function getSumOfLast30DaysUserDailyStatsByUserIdWalletCode(userId, walletCode, {
	projections = [],
} = {}) {
	const currentDate = new Date();
	const to = generateStatsDateString(currentDate);
	const from = generateStatsDateStringBeforeNDays(currentDate, 29);
	const aggregations = projections.map((field) => {
		return [fn('sum', col(field)), field];
	});

	return findOne({
		where: {
			userId,
			walletCode,
			date: {
				[Op.gte]: from,
				[Op.lte]: to,
			}
		},
		attributes: [
			"userId",
			...aggregations,
		],
		group: ['userId'],
	});
}

/*
 *  sort by distance to root, leaf at head. root at tail.
 */
async function getUserDailyStatsesWithAncestorRelationshipsByDateAndWalletCode(date, walletCode, {
	projections,
} = {}) {
	const model = RelationshipModel.getInstance();

	const results = await find({
		where: {
			date: generateStatsDateString(date),
			walletCode,
		},
		include: [
			{
				model,
				where: {
					ancestorId: ROOT_USER_ID,
				},
				attributes: [],
				as: "root",
			},
			{
				model,
				where: {
					distance: {
						[Op.gt]: 0,
					}
				},
				attributes: [
					["ancestorId", "id"],
					["ancestorUsername", "username"],
				],
				as: "ancestors",
			},
		],
		order: [[
			{
				model,
				as: "root",
			},
			"distance",
			"desc"
		]],
		raw: false,
		attributes: projections,
	});

	return results.map(result => result.toJSON());
}

module.exports = {
	createUserDailyStats,
	increaseUserDailyStatsByUserIdWalletCodeAndDate,

	getUserDailyStatsByUserIdWalletCodeAndDates,
	getTodayUserDailyStatsByUserIdWalletCode,
	getSumOfLast30DaysUserDailyStatsByUserIdWalletCode,
	getUserDailyStatsesWithAncestorRelationshipsByDateAndWalletCode,

	WITHDRAWAL_CREATION_REQUIRED_PROJECTIONS,
	BETTING_PROFIT_PROJECTIONS,
	TRANSFER_AMOUNT_ONLY_PROJECTIONS,
};
