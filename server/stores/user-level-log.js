const {
	create,
	findAndCountAll,
} = require("../models/user-level-log");
const {
	getOffsetByPageAndLimit,
} = require("./index");
const SQLWhereClauseBuilder = require("../lib/sequlize-query-builder/sql-where-clause-builder");
const SQLOrderClauseBuilder = require("../lib/sequlize-query-builder/sql-order-clause-builder");

function createUserLevelLog(row, {
	transaction,
} = {}) {
	return create(row, { transaction });
}

async function getUserLevelLogsByPagination(page, {
	limit,
	from,
	to,
	status,
	afterLevelId,
	previousLevelId,
	userId,
	sort: field,
	order: rule,
}) {
	const offset = getOffsetByPageAndLimit(page, limit);
	const where = new SQLWhereClauseBuilder()
		.setGte("createdAt", from)
		.setLte("createdAt", to)
		.setEqual("userId", userId)
		.setEqual("afterLevelId", afterLevelId)
		.setEqual("previousLevelId", previousLevelId)
		.setIn("status", status)
		.build();
	const order = new SQLOrderClauseBuilder()
		.setOrder(field, rule)
		.build();

	const { count: numOfItems, rows: data } = await findAndCountAll({
		where,
		order,
		offset,
		limit,
	});

	return {
		data,
		numOfItems,
		numOfPages: Math.ceil(numOfItems / limit),
	};
}

module.exports = {
	createUserLevelLog,
	getUserLevelLogsByPagination,
};
