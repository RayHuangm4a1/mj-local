const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {
	insertMany,
	findAndCountAll,
	find,
} = require("../models/transaction-log");
const BettingModel = require("../models/betting");
const {
	ENUM_TRANSACTION_STATUS,
} = require("../lib/enum");
const {
	getOffsetByPageAndLimit,
} = require("./index");
const {
	isPartitionPrimaryKeyExisted,
} = require("./common");
const SQLWhereClauseBuilder = require("../lib/sequlize-query-builder/sql-where-clause-builder");
const SQLOrderClauseBuilder = require("../lib/sequlize-query-builder/sql-order-clause-builder");
const MIN_PROJECTIONS = [
	"id", "userId", "associateId",
	"type", "walletCode", "amount",
	"balance", "description", "createdAt",
];
const COMMISSION_GRANTING_REQUIRED_PROJECTIONS = [
	"id", "userId", "username",
	"walletCode", "type", "amount",
	"status", "createdAt",
];

function createTransactionLogs(rows, {
	transaction,
} = {}) {
	return insertMany(rows, {
		transaction,
	});
}

/**
 * @param {object} transactionLogs - The prepare updated transactionLogs.
 * @example transactionLogs: [{ id, balance, status, createdAt }]
 */
function bulkUpdateTransactionLogs(transactionLogs, { transaction } = {}) {
	if (!isPartitionPrimaryKeyExisted(transactionLogs)) {
		throw new Error("id & createdAt are required");
	}

	return insertMany(transactionLogs, {
		transaction,
		updateOnDuplicate: [
			"balance", "status", "updatedAt",
		],
		ignoreDuplicates: true,
	});
}

async function getFinishedTransactionLogsByUserIdDatesAndPagination(userId, from, to, page, {
	types,
	id,
	sort: field,
	order: rule,
	limit,
	projections,
}) {
	const offset = getOffsetByPageAndLimit(page, limit);
	const order = new SQLOrderClauseBuilder()
		.setOrder(field, rule)
		.build();
	const where = new SQLWhereClauseBuilder()
		.setEqual("userId", userId)
		.setGte("createdAt", from)
		.setLte("createdAt", to)
		.setIn("type", types)
		.setEqual("id", id)
		.setEqual("status", ENUM_TRANSACTION_STATUS.DONE)
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

function getFinishedTransactionLogsWithinIds(ids, {
	projections,
} = {}) {
	if (!ids.length) {
		throw new Error("transaction ids are required.");
	}

	return find({
		where: {
			id: {
				[Op.in]: ids,
			},
			status: ENUM_TRANSACTION_STATUS.DONE,
		},
		attributes: projections,
	});
}

function getPendingTransactionLogsByLotteryIdAndIssue(lotteryId, issue, {
	projections,
}) {
	return find({
		where: {
			lotteryId,
			issue,
			status: ENUM_TRANSACTION_STATUS.PENDING,
		},
		include: [
			{
				model: BettingModel.getInstance(),
				attributes: ["ancestors"],
				as: "betting",
				required: false,
			},
		],
		raw: false,
		order: [[
			"createdAt", "asc"
		]],
		attributes: projections,
	});
}

module.exports = {
	MIN_PROJECTIONS,
	COMMISSION_GRANTING_REQUIRED_PROJECTIONS,

	createTransactionLogs,
	bulkUpdateTransactionLogs,

	getFinishedTransactionLogsByUserIdDatesAndPagination,
	getFinishedTransactionLogsWithinIds,
	getPendingTransactionLogsByLotteryIdAndIssue,
};
