const Sequelize = require("sequelize");
const Joi = require("joi");
const Op = Sequelize.Op;
const {
	getTransaction,
	insertMany,
	find,
	findOne,
	update,
	findAndCountAll,
	count,
} = require("../models/betting");
const {
	isPartitionPrimaryKeyExisted,
} = require("./common");
const {
	ENUM_BETTING_TYPE,
	ENUM_BETTING_STATUS,
	ENUM_BETTING_CANCELED_TYPE,
} = require("../lib/enum");
const {
	getOffsetByPageAndLimit,
} = require("./index");
const SQLWhereClauseBuilder = require("../lib/sequlize-query-builder/sql-where-clause-builder");
const SQLOrderClauseBuilder = require("../lib/sequlize-query-builder/sql-order-clause-builder");

function createBettings(rows, {
	transaction,
} = {}) {
	return insertMany(rows, {
		transaction,
	});
}

async function getBettingsByUserIdDatesAndPagination(userId, from, to, page, {
	id,
	issue,
	lotteryId,
	status,
	limit,
	sort: field,
	order: rule,
	projections,
} = {}) {
	const now = new Date();
	const offset = getOffsetByPageAndLimit(page, limit);
	const order = new SQLOrderClauseBuilder()
		.setOrder(field, rule)
		.build();

	const whereClauseBuilder = new SQLWhereClauseBuilder()
		.setEqual("userId", userId)
		.setGte("createdAt", from)
		.setLte("createdAt", to)
		.setEqual("id", id)
		.setEqual("issue", issue)
		.setEqual("lotteryId", lotteryId)
		.setEqual("status", status);

	if (status === ENUM_BETTING_STATUS.NOT_OPENED) {
		whereClauseBuilder
			.setEqual("status", ENUM_BETTING_STATUS.NEW)
			.setGt("openedAt", now);
	} else if (status === ENUM_BETTING_STATUS.OPENING) {
		whereClauseBuilder
			.setEqual("status", ENUM_BETTING_STATUS.NEW)
			.setLte("openedAt", now);
	}

	const where = whereClauseBuilder.build();
	const { count: numOfItems, rows: data } = await findAndCountAll({
		where,
		order,
		offset,
		limit,
		raw: false,
		attributes: projections,
	});

	return {
		data,
		numOfItems,
		numOfPages: Math.ceil(numOfItems / limit),
	};
}

async function getBettingsByUserIdTraceIdAndPagination(userId, traceId, page, {
	limit,
	projections,
} = {}) {
	const offset = getOffsetByPageAndLimit(page, limit);
	const where = new SQLWhereClauseBuilder()
		.setEqual("userId", userId)
		.setEqual("traceId", traceId)
		.build();
	const order = new SQLOrderClauseBuilder()
		.setOrder("createdAt", "asc")
		.build();

	const { count: numOfItems, rows: data } = await findAndCountAll({
		where,
		order,
		offset,
		limit,
		raw: false,
		attributes: projections,
	});

	return {
		data,
		numOfItems,
		numOfPages: Math.ceil(numOfItems / limit),
	};
}

async function getBettingsWithinUserIdsDatesAndPagination(childrenIds, from, to, page, {
	id,
	issue,
	lotteryId,
	limit,
	status,
	sort: field,
	order: rule,
	projections,
} = {}) {
	const now = new Date();
	const offset = getOffsetByPageAndLimit(page, limit);
	const order = new SQLOrderClauseBuilder()
		.setOrder(field, rule)
		.build();

	const whereClauseBuilder = new SQLWhereClauseBuilder()
		.setIn("userId", childrenIds)
		.setGte("createdAt", from)
		.setLte("createdAt", to)
		.setEqual("id", id)
		.setEqual("issue", issue)
		.setEqual("lotteryId", lotteryId)
		.setEqual("status", status);

	if (status === ENUM_BETTING_STATUS.NOT_OPENED) {
		whereClauseBuilder
			.setEqual("status", ENUM_BETTING_STATUS.NEW)
			.setGt("openedAt", now);
	} else if (status === ENUM_BETTING_STATUS.OPENING) {
		whereClauseBuilder
			.setEqual("status", ENUM_BETTING_STATUS.NEW)
			.setLte("openedAt", now);
	}

	const where = whereClauseBuilder.build();
	const { count: numOfItems, rows: data } = await findAndCountAll({
		where,
		order,
		offset,
		limit,
		raw: false,
		attributes: projections,
	});

	return {
		data,
		numOfItems,
		numOfPages: Math.ceil(numOfItems / limit),
	};

}

function getBettingsByLotteryIdIssueAndDates(lotteryId, issue, from, to, {
	projections,
} = {}) {
	return find({
		where: {
			lotteryId,
			issue,
			createdAt: {
				[Op.lte]: to,
				[Op.gte]: from,
			},
		},
		order: [[ "createdAt" ]],
		attributes: projections,
	});
}

function getNewBettingsByLotteryIdIssueAndDates(lotteryId, issue, from, to, {
	projections,
} = {}) {
	return find({
		where: {
			lotteryId,
			issue,
			status: ENUM_BETTING_STATUS.NEW,
			createdAt: {
				[Op.lte]: to,
				[Op.gte]: from,
			},
		},
		order: [[ "createdAt" ]],
		attributes: projections,
	});
}

function countBettingUsersByLotteryIdAndIssue(lotteryId, issue) {
	return count({
		where: {
			lotteryId,
			issue,
			type: {
				[Op.ne]: ENUM_BETTING_STATUS.CANCELED,
			},
		},
		distinct: true,
		col: "userId",
	});
}

function getEarliestCancelableBettingByLotteryIdAndIssue(lotteryId, issue, {
	projections,
} = {}) {
	return findOne({
		where: {
			lotteryId,
			issue,
			status: {
				[Op.in]: [
					ENUM_BETTING_STATUS.NEW,
					ENUM_BETTING_STATUS.WIN,
					ENUM_BETTING_STATUS.LOSE,
				],
			},
		},
		order: [[ "createdAt" ]],
		attributes: projections,
	});
}

function getEarliestRenewableBettingByLotteryIdAndIssue(lotteryId, issue, {
	projections,
} = {}) {
	return findOne({
		where: {
			lotteryId,
			issue,
			status: {
				[Op.in]: [
					ENUM_BETTING_STATUS.WIN,
					ENUM_BETTING_STATUS.LOSE,
				],
			},
		},
		order: [[ "createdAt" ]],
		attributes: projections,
	});
}

function getBettingById(id, {
	transaction,
	lock,
	projections,
} = {}) {
	return findOne({
		where: {
			id,
		},
		transaction,
		lock,
		attributes: projections,
	});
}

function getBettingByIdAndUserId(id, userId, {
	projections,
} = {}) {
	return findOne({
		where: {
			id,
			userId,
		},
		raw: false,
		attributes: projections,
	});
}

function getCancelableBettingsWithinIdsTraceIdAndUserId(ids, traceId, userId, {
	transaction,
	lock,
	projections,
} = {}) {
	return find({
		where: {
			traceId,
			userId,
			id: {
				[Op.in]: ids,
			},
			status: ENUM_BETTING_STATUS.NEW,
			closedAt: {
				[Op.gt]: new Date(),
			},
		},
		order: Sequelize.literal(`FIELD(id,${ids.join(",")})`),
		attributes: projections,
		transaction,
		lock,
	});
}

async function getBettingsByLotteryIdDatesAndPagination(lotteryId, from, to, page, {
	userId,
	id,
	playId,
	traceId,
	type,
	ip,
	issue,
	amountPerBet,
	status,
	limit,
	sort: field,
	order: rule,
	projections,
} = {}) {
	const offset = getOffsetByPageAndLimit(page, limit);
	const where = new SQLWhereClauseBuilder()
		.setGte("createdAt", new Date(from))
		.setLte("createdAt", new Date(to))
		.setEqual("userId", userId)
		.setEqual("id", id)
		.setEqual("playId", playId)
		.setEqual("lotteryId", lotteryId)
		.setEqual("ip", ip)
		.setEqual("issue", issue)
		.setEqual("amountPerBet", amountPerBet)
		.setEqual("status", status)
		.setEqual("traceId", traceId)
		.setEqual("type", type)
		.build();
	const order = new SQLOrderClauseBuilder()
		.setOrder(field, rule)
		.build();

	const { count: numOfItems, rows: data } = await findAndCountAll({
		where,
		order,
		offset,
		limit,
		raw: false,
		attributes: projections,
	});

	return {
		data,
		numOfItems,
		numOfPages: Math.ceil(numOfItems / limit),
	};
}

function getTerminatingBettingsByTraceId(traceId, {
	projections,
	transaction,
	lock,
} = {}) {
	return find({
		where: {
			traceId,
			status: ENUM_BETTING_STATUS.TERMINATING,
		},
		order: [[ "issue" ]],
		attributes: projections,
		transaction,
		lock,
	});
}

function getWonBettingsGreaterThanUpdatedAtByUserId(userId, updatedAt, {
	projections,
	limit,
} = {}) {
	return find({
		where: {
			userId,
			status: ENUM_BETTING_STATUS.WIN,
			updatedAt: {
				[Op.gt]: updatedAt,
			}
		},
		order: [[ "updatedAt", "DESC" ]],
		attributes: projections,
		limit,
	});
}

function hasCountBettingsKeys(rows) {
	const schema = Joi.array().items(Joi.object({
		lotteryId: Joi.number().integer().required(),
		issue: Joi.number().integer().required(),
		userId: Joi.number().integer().required(),
	}));

	const { error } = Joi.validate(rows, schema, { allowUnknown: false });

	return error === null;
}

function countBettingsWithinLotteryIdIssueAndUserId(queries = []) {
	if (!hasCountBettingsKeys(queries)) {
		throw new Error("wrong keys, should be only lotteryId, issue, userId");
	}

	return count({
		where: {
			[Op.or]: queries,
		},
	});
}

async function cancelBettingIfCancelableByIdAndUserId(id, userId, canceledType, {
	transaction,
} = {}) {
	const result = await update({
		canceledType,
		status: ENUM_BETTING_STATUS.CANCELED,
	}, {
		where: {
			id,
			userId,
			status: ENUM_BETTING_STATUS.NEW,
			closedAt: {
				[Op.gt]: new Date(),
			},
		},
		transaction,
	});

	if (result === null || result.affectedRows !== 1) {
		return null;
	}

	return getBettingById(id, { transaction });
}

async function cancelBettingsIfCancelableWithinIdsTraceIdAndUserId(ids, traceId, userId, canceledType, {
	transaction,
} = {}) {
	const bettings = await getCancelableBettingsWithinIdsTraceIdAndUserId(ids, traceId, userId, {
		transaction,
		lock: transaction.LOCK.UPDATE,
	});

	if (!bettings.length) {
		return [];
	}

	const cancelableBettingIds = bettings.map(betting => betting.id);

	const result = await cancelBettingsWithinIds(cancelableBettingIds, canceledType, { transaction });

	if (result === null || result.affectedRows !== cancelableBettingIds.length) {
		return [];
	}

	return bettings.map(betting => {
		betting.status = ENUM_BETTING_STATUS.CANCELED;
		betting.canceledType = canceledType;

		return betting;
	});
}

function cancelBettingsWithinIds(ids, canceledType, {
	transaction,
} = {}) {
	return update({
		canceledType,
		status: ENUM_BETTING_STATUS.CANCELED,
	}, {
		where: {
			id: {
				[Op.in]: ids,
			},
		},
		transaction,
	});
}

function cancelBettingById(id, canceledType, {
	transaction,
} = {}) {
	return update({
		canceledType,
		status: ENUM_BETTING_STATUS.CANCELED,
	}, {
		where: {
			id
		},
		transaction,
	});
}

function stopBettingsWithinTraceIds(traceIds, {
	transaction,
} = {}) {
	return update({
		status: ENUM_BETTING_STATUS.TERMINATING,
	}, {
		where: {
			traceId: {
				[Op.in]: traceIds,
			},
			status: ENUM_BETTING_STATUS.NEW,
		},
		transaction,
	});
}

function terminateBettingsByTraceId(traceId, {
	transaction,
} = {}) {
	return update({
		canceledType: ENUM_BETTING_CANCELED_TYPE.CANCELED_BY_SYSTEM,
		status: ENUM_BETTING_STATUS.CANCELED,
	}, {
		where: {
			traceId,
			status: ENUM_BETTING_STATUS.TERMINATING,
		},
		transaction,
	});
}

function renewBettingById(id, {
	transaction,
} = {}) {
	return update({
		opencode: null,
		reward: 0,
		status: ENUM_BETTING_STATUS.NEW,
		details: [],
	}, {
		where: {
			id,
		},
		transaction,
	});
}

/**
 * @param {object} bettings - The failed bettings.
 * @example bettings: [{ id, opencode, reward, status, details, createdAt, updatedAt }]
 */
function bulkUpdateBettingRewards(bettings, { transaction }) {
	if (!isPartitionPrimaryKeyExisted(bettings)) {
		throw new Error("id & createdAt are required");
	}

	return insertMany(bettings, {
		transaction,
		updateOnDuplicate: [
			"opencode", "reward", "status",
			"ancestors", "details", "transactionLogIds",
			"updatedAt",
		],
		ignoreDuplicates: true,
	});
}

/**
 * @param {object} bettings - The failed bettings.
 * @example bettings: [{ id, opencode, status, createdAt, error }]
 */
function bulkUpdateFailedBettings(bettings) {
	if (!isPartitionPrimaryKeyExisted(bettings)) {
		throw new Error("id & createdAt are required");
	}

	return insertMany(bettings, {
		updateOnDuplicate: [
			"opencode", "status", "error",
			"updatedAt",
		],
		ignoreDuplicates: true,
	});
}

module.exports = {
	getTransaction,
	createBettings,
	getBettingsByUserIdDatesAndPagination,
	getBettingsByUserIdTraceIdAndPagination,
	getBettingsByLotteryIdIssueAndDates,
	getNewBettingsByLotteryIdIssueAndDates,
	countBettingUsersByLotteryIdAndIssue,
	getEarliestCancelableBettingByLotteryIdAndIssue,
	getEarliestRenewableBettingByLotteryIdAndIssue,
	getBettingByIdAndUserId,
	getBettingsWithinUserIdsDatesAndPagination,
	getBettingsByLotteryIdDatesAndPagination,
	getTerminatingBettingsByTraceId,
	getWonBettingsGreaterThanUpdatedAtByUserId,
	countBettingsWithinLotteryIdIssueAndUserId,
	cancelBettingById,
	cancelBettingIfCancelableByIdAndUserId,
	cancelBettingsIfCancelableWithinIdsTraceIdAndUserId,
	stopBettingsWithinTraceIds,
	terminateBettingsByTraceId,
	renewBettingById,
	bulkUpdateBettingRewards,
	bulkUpdateFailedBettings,

	// projections
	IGNORE_ANCESTORS_AND_AWARD_PROJECTIONS: [
		"id", "userId", "username",
		"walletCode", "type", "traceId",
		"lotteryClassId", "lotteryId", "lotteryName",
		"playId", "unit", "name",
		"bonus", "rebate", "issue",
		"opencode", "reward", "amountPerBet",
		"multiple", "count", "amount",
		"betcontent", "weizhi", "isPK",
		"isTerminatedIfWin", "status", "canceledType",
		"details", "device", "error",
		"closedAt", "openedAt", "createdAt",
		"updatedAt",
	],
	AWARD_CACULATION_REQUIRED_PROJECTIONS: [
		"id", "userId", "username",
		"traceId", "walletCode", "lotteryClassId",
		"lotteryId", "playId", "unit",
		"awards", "bonus", "rebate",
		"issue", "amountPerBet", "multiple",
		"count", "amount", "betcontent",
		"weizhi", "isPK", "isTerminatedIfWin",
		"createdAt",
	],
	TERMINATED_BETTINGS_RETURNING_REQUIRED_PROJECTIONS: [
		"id", "userId", "username",
		"walletCode", "amount", "lotteryId",
		"issue",
	],
	DESCENDANT_TRACE_BETTINGS_REQUIRE_PROJECTIONS: [
		"id", "issue", "opencode",
		"reward", "multiple", "amount",
		"status", "details",
	],
	WON_NOTIFICATION_PROJECTIONS: [
		"id",
		"reward",
	],
};
