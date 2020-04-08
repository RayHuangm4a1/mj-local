const Joi = require("joi");
const { omit } = require("ljit-collection");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {
	find,
	update,
	findCreateFind,
	getTransaction,
	findOne,
	insertMany,
} = require("../models/team-duration-stats");
const {
	ENUM_WALLET_CODE,
	ENUM_DIVIDEND_STATUS,
} = require("../lib/enum");
const {
	GrantChildrenDividendsHelper,
	DividendStatusAndMaxGrantAmountHelper,
} = require("../lib/stats-helpers");
const {
	isPartialGranted,
	isFullGranted,
	getTotalGrantedAmount,
	getProfitInDecimal,
} = GrantChildrenDividendsHelper;
const EVALUATE_DIVIDEND_ARCHIEVEMENT_REQUIRED_PROJECTIONS = [
	"userId", "bettingAmount",
	"bettingReward", "rebateAmount", "activityAmount",
	"fixedWageAmount", "incentiveAmount", "maxGrantAmount",
	"grantedAmount",
];
const GRANT_ZHAOSHANG_DIVIDENDS_REQUIRED_PROJECTIONS = [
	"maxGrantAmount",
];

function createTeamDurationStatsIfNotExist(row, {
	transaction,
} = {}) {
	const {
		userId, walletCode, durationId,
		...defaults
	} = row;

	return findCreateFind({
		where: {
			userId,
			walletCode,
			durationId,
		},
		defaults,
		transaction,
	});
}

function incrementTeamDurationStatsByUserIdWalletCodeDurationIdAndLatestStatsAt(userId, walletCode, durationId,
	latestStatsAt, row, { transaction }
) {
	const incrementStats = omit(row, ["username"]);
	const preparedUpdateTeamDurationStats = Object.entries(incrementStats)
		.reduce((accumulator, [fieldName, amount]) => {
			accumulator[fieldName] = Sequelize.literal(`${fieldName} + ${amount}`);

			return accumulator;
		}, {
			latestStatsAt,
		});

	return update(preparedUpdateTeamDurationStats, {
		where: {
			userId,
			walletCode,
			durationId,
			latestStatsAt: {
				[Op.lt]: latestStatsAt,
			},
		},
		transaction,
	});
}

function updateTeamDurationStatsMaxGrantAmountAndStatusByUserIdWalletCodeAndDurationId(userId, walletCode, durationId, { status, maxGrantAmount }, {
	transaction,
} = {}) {
	return update({
		status,
		maxGrantAmount,
	}, {
		where: {
			userId,
			walletCode,
			durationId,
		},
		transaction,
	});
}

function updateTeamDurationStatsGrantedAmountAndStatusByUserIdWalletCodeAndDurationId(userId, walletCode, durationId, { status, grantedAmount }, {
	transaction,
} = {}) {
	return update({
		grantedAmount,
		status,
	}, {
		where: {
			userId,
			walletCode,
			durationId,
		},
		transaction,
	});
}

function isPrimaryKeyExisted(rows) {
	const schema = Joi.array().items(Joi.object({
		userId: Joi.number().integer().required(),
		walletCode: Joi.number().integer().required(),
		durationId: Joi.number().integer().required(),
	}));

	const { error } = Joi.validate(rows, schema, { allowUnknown: true });

	return error === null;
}

function bulkUpdateTeamDurationStatsMaxGrantAmountAndStatus(
	teamDurationStatses,
	dividendSettings,
	{
		transaction,
	}  = {}
) {
	if (!isPrimaryKeyExisted(teamDurationStatses)) {
		throw new Error("userId, walletCode & durationId is required");
	}

	const preparedTeamDurationStatses = teamDurationStatses.map(teamDurationStats => {
		const { userId, walletCode, durationId } = teamDurationStats;
		const { status, maxGrantAmount } = new DividendStatusAndMaxGrantAmountHelper({
			teamDurationStats, dividendSettings,
		}).getResult();

		return {
			userId, walletCode, durationId,
			status, maxGrantAmount
		};
	});

	return insertMany(preparedTeamDurationStatses, {
		transaction,
		updateOnDuplicate: ["status", "maxGrantAmount", "updatedAt"],
		ignoreDuplicates: true,
	});
}

async function updateTeamDurationStatsesWithinUserIdsAndDividendSettings(
	userIds,
	dividendSettings,
	{ transaction } = {}
) {
	const teamDurationStatses = await getTeamDurationStatsesWithinUserIdsAndWalletCode(userIds, ENUM_WALLET_CODE.PRIMARY, {
		transaction,
		lock: transaction.LOCK.UPDATE,
	});

	return bulkUpdateTeamDurationStatsMaxGrantAmountAndStatus(
		teamDurationStatses,
		dividendSettings,
		{
			transaction,
		}
	);
}

function getTeamDurationStatsesByUserIdAndWalletCode(userId, walletCode, {
	transaction,
	lock,
	projections,
} = {}) {
	return find({
		where: {
			userId,
			walletCode,
		},
		transaction,
		lock,
		attributes: projections,
	});
}

function getTeamDurationStatsesWithinUserIdsAndWalletCode(userIds, walletCode, {
	transaction,
	lock,
	projections,
} = {}) {
	return find({
		where: {
			userId: {
				[Op.in]: userIds,
			},
			walletCode,
		},
		transaction,
		lock,
		attributes: projections,
	});
}

function getTeamDurationStatsByUserIdWalletCodeAndDurationId(userId, walletCode, durationId, {
	projections,
	transaction,
} = {}) {
	return findOne({
		where: {
			userId,
			walletCode,
			durationId,
		},
		projections,
		transaction,
	});
}

async function increaseTeamDurationStatsGrantedAmountByUserIdWalletCodeAndDurationId(userId, walletCode, durationId, amount, {
	transaction,
} = {}) {
	const teamDurationStats = await getTeamDurationStatsByUserIdWalletCodeAndDurationId(userId, walletCode, durationId, {
		transaction,
		lock: transaction.LOCK.UPDATE,
	});

	let status;

	if (isPartialGranted(teamDurationStats, amount)) {
		status = ENUM_DIVIDEND_STATUS.PARTIAL_GRANTED;
	}

	if (isFullGranted(teamDurationStats, amount)) {
		status = ENUM_DIVIDEND_STATUS.FULL_GRANTED;
	}

	const totalGrantedAmount = getTotalGrantedAmount(teamDurationStats, amount);

	await updateTeamDurationStatsGrantedAmountAndStatusByUserIdWalletCodeAndDurationId(
		userId,
		walletCode,
		durationId,
		{
			status,
			grantedAmount: totalGrantedAmount,
		},
		{
			transaction,
		}
	);

	teamDurationStats.status = status;
	teamDurationStats.grantedAmount = totalGrantedAmount;
	teamDurationStats.profit = getProfitInDecimal(teamDurationStats).toNumber();

	return teamDurationStats;
}

function getNotGrantedTeamDurationStatsByUserIdWalletCodeAndDurationId(userId, walletCode, durationId, {
	transaction,
	lock,
	projections,
} = {}) {
	return findOne({
		where: {
			userId,
			walletCode,
			durationId,
			status: ENUM_DIVIDEND_STATUS.NOT_GRANTED,
			maxGrantAmount: {
				[Op.gt]: 0,
			},
		},
		transaction,
		lock,
		projections,
	});
}

module.exports = {
	createTeamDurationStatsIfNotExist,
	getTransaction,
	getTeamDurationStatsesByUserIdAndWalletCode,
	getTeamDurationStatsesWithinUserIdsAndWalletCode,
	getTeamDurationStatsByUserIdWalletCodeAndDurationId,
	getNotGrantedTeamDurationStatsByUserIdWalletCodeAndDurationId,
	updateTeamDurationStatsMaxGrantAmountAndStatusByUserIdWalletCodeAndDurationId,
	bulkUpdateTeamDurationStatsMaxGrantAmountAndStatus,
	updateTeamDurationStatsesWithinUserIdsAndDividendSettings,
	increaseTeamDurationStatsGrantedAmountByUserIdWalletCodeAndDurationId,
	incrementTeamDurationStatsByUserIdWalletCodeDurationIdAndLatestStatsAt,

	EVALUATE_DIVIDEND_ARCHIEVEMENT_REQUIRED_PROJECTIONS,
	GRANT_ZHAOSHANG_DIVIDENDS_REQUIRED_PROJECTIONS,
};
