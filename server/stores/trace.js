const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {
	getTransaction,
	insertMany,
	find,
	findOne,
	findAndCountAll,
	update,
} = require("../models/trace");
const BettingModel = require("../models/betting");
const {
	getOffsetByPageAndLimit,
} = require("./index");
const SQLWhereClauseBuilder = require("../lib/sequlize-query-builder/sql-where-clause-builder");
const SQLOrderClauseBuilder = require("../lib/sequlize-query-builder/sql-order-clause-builder");
const {
	ENUM_TRACE_STATUS,
} = require("../lib/enum");

function createTraces(rows, {
	transaction,
} = {}) {
	return insertMany(rows, {
		transaction,
	});
}

/*
	status, numOfFinishedIssues position could not changed.
*/
function increaseNumOfFinishedIssuesById(id, amount, {
	transaction,
} = {}) {
	return update({
		status: Sequelize.literal(`IF(numOfIssues = numOfFinishedIssues + ${amount}, ${ENUM_TRACE_STATUS.DONE}, status)`),
		numOfFinishedIssues: Sequelize.literal(`numOfFinishedIssues + ${amount}`),
	}, {
		where: { id },
		transaction,
	});
}

/*
	status, numOfFinishedIssues position could not changed.
*/
function increaseNumOfFinishedIssuesWithinIds(ids, amount, {
	transaction,
} = {}) {
	return update({
		status: Sequelize.literal(`IF(numOfIssues = numOfFinishedIssues + ${amount}, ${ENUM_TRACE_STATUS.DONE}, status)`),
		numOfFinishedIssues: Sequelize.literal(`numOfFinishedIssues + ${amount}`),
	}, {
		where: {
			id: {
				[Op.in]: ids,
			}
		},
		transaction,
	});
}

function stopTracesWithinIds(ids, {
	transaction,
} = {}) {
	return update({
		status: ENUM_TRACE_STATUS.TERMINATING,
		numOfFinishedIssues: Sequelize.literal(`numOfFinishedIssues + 1`),
	}, {
		where: {
			id: {
				[Op.in]: ids,
			},
			status: ENUM_TRACE_STATUS.NEW,
		},
		transaction,
	});
}

function terminateTraceById(id, {
	transaction,
} = {}) {
	return update({
		status: ENUM_TRACE_STATUS.DONE,
		numOfFinishedIssues: Sequelize.literal(`numOfIssues`),
	}, {
		where: {
			id,
			status: ENUM_TRACE_STATUS.TERMINATING,
		},
		transaction,
	});
}

async function getTracesByUserIdDatesAndPagination(userId, from, to, page, {
	id,
	lotteryId,
	limit,
	status,
	sort: field,
	order: rule,
	projections,
} = {}) {
	const offset = getOffsetByPageAndLimit(page, limit);

	const where = new SQLWhereClauseBuilder()
		.setEqual("userId", userId)
		.setEqual("id", id)
		.setEqual("lotteryId", lotteryId)
		.setEqual("status", status)
		.setGte("createdAt", from)
		.setLte("createdAt", to)
		.build();

	const order = new SQLOrderClauseBuilder()
		.setOrder(field, rule)
		.build();

	const { count: numOfItems, rows: data } = await findAndCountAll({
		where,
		order,
		offset,
		limit,
		attributes: projections,
	});

	return {
		data,
		numOfItems,
		numOfPages: Math.ceil(numOfItems / limit),
	};
}

async function getTracesWithinUserIdsDatesAndPagination(childrenIds, from, to, page, {
	id,
	lotteryId,
	limit,
	status,
	sort: field,
	order: rule,
	projections,
} = {}) {
	const offset = getOffsetByPageAndLimit(page, limit);

	const order = new SQLOrderClauseBuilder()
		.setOrder(field, rule)
		.build();

	const where = new SQLWhereClauseBuilder()
		.setIn("userId", childrenIds)
		.setGte("createdAt", from)
		.setLte("createdAt", to)
		.setEqual("id", id)
		.setEqual("lotteryId", lotteryId)
		.setEqual("status", status)
		.build();

	const { count: numOfItems, rows: data } = await findAndCountAll({
		where,
		raw: false,
		order,
		limit,
		offset,
		attributes: projections,
	});

	return {
		data,
		numOfItems,
		numOfPages: Math.ceil(numOfItems / limit),
	};
}

function getTraceByIdAndUserId(id, userId, {
	projections,
} = {}) {
	return findOne({
		where: {
			id,
			userId,
		},
		attributes: projections,
	});
}

function getTerminatingTraces({
	projections,
} = {}) {
	return find({
		where: {
			status: ENUM_TRACE_STATUS.TERMINATING,
		},
		order: [[
			"createdAt", "asc"
		]],
		attributes: projections,
	});
}

async function getTracesByLotteryIdDatesAndPagination(lotteryId, from, to, page, {
	id,
	userId,
	status,
	playId,
	limit,
	projections
} = {}) {
	const offset = getOffsetByPageAndLimit(page, limit);
	const where = new SQLWhereClauseBuilder()
		.setEqual("lotteryId", lotteryId)
		.setGte("createdAt", new Date(from))
		.setLte("createdAt", new Date(to))
		.setEqual("userId", userId)
		.setEqual("id", id)
		.setEqual("playId", playId)
		.setEqual("status", status)
		.build();

	const { count: numOfItems, rows: data } = await findAndCountAll({
		where,
		offset,
		limit,
		raw: false,
		attributes: projections,
		subQuery: false,
	});

	return {
		data,
		numOfItems,
		numOfPages: Math.ceil(numOfItems / limit),
	};
}

async function getTracesByLotteryIdIssueDatesAndPagination(lotteryId, issue, from, to, page, {
	id,
	userId,
	status,
	playId,
	limit,
	projections
} = {}) {
	const offset = getOffsetByPageAndLimit(page, limit);
	const where = new SQLWhereClauseBuilder()
		.setGte("createdAt", new Date(from))
		.setLte("createdAt", new Date(to))
		.setEqual("userId", userId)
		.setEqual("id", id)
		.setEqual("playId", playId)
		.setEqual("lotteryId", lotteryId)
		.setEqual("status", status)
		.build();

	const bettingWhereClause = new SQLWhereClauseBuilder()
		.setEqual("issue", issue)
		.build();

	const { count: numOfItems, rows: data } = await findAndCountAll({
		where,
		include: [{
			model: BettingModel.getInstance(),
			attributes: ["issue"],
			as: "bettings",
			where: bettingWhereClause,
			require: true,
		}],
		offset,
		limit,
		raw: false,
		attributes: projections,
		subQuery: false,
	});

	return {
		data,
		numOfItems,
		numOfPages: Math.ceil(numOfItems / limit),
	};
}

module.exports = {
	createTraces,
	increaseNumOfFinishedIssuesById,
	increaseNumOfFinishedIssuesWithinIds,
	stopTracesWithinIds,
	terminateTraceById,
	getTransaction,
	getTracesByUserIdDatesAndPagination,
	getTracesWithinUserIdsDatesAndPagination,
	getTraceByIdAndUserId,
	getTerminatingTraces,
	getTracesByLotteryIdDatesAndPagination,
	getTracesByLotteryIdIssueDatesAndPagination,

	TERMINATE_REQUIRED_PROJECTIONS: [
		"id", "userId", "walletCode",
	],
	TRACE_REQUIRED_PROJECTIONS: [
		"id", "username", "lotteryName",
		"name", "isTerminatedIfWin", "numOfIssues",
		"numOfFinishedIssues", "rebate", "amountPerBet",
		"amount", "betcontent", "weizhi",
		"status", "device", "createdAt",
	],
	TRACES_REQUIRED_PROJECTIONS: [
		"id", "username", "lotteryName",
		"name", "isTerminatedIfWin", "numOfIssues",
		"numOfFinishedIssues", "count", "amount",
		"createdAt", "status",
	],
};
