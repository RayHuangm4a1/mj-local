const {
	getTransaction,
	find,
	findOne,
	findAndCountAll,
	increment,
	insertMany,
} = require("../models/wallet");
const Sequelize = require("sequelize");
const SQLOrderClauseBuilder = require("../lib/sequlize-query-builder/sql-order-clause-builder");
const Op = Sequelize.Op;
const {
	ENUM_WALLET_TYPE,
	ENUM_WALLET_CODE,
} = require("../lib/enum");
const {
	getOffsetByPageAndLimit,
} = require("./index");
const MIN_PROJECTIONS = [
	"id",
	"userId",
	"username",
	"name",
	"type",
	"code",
	"balance",
	"isUsed",
];
const BALANCE_ONLY_PROJECTIONS = ["balance"];

function generateDefaultWallets() {
	return [
		{
			name: "彩票钱包",
			type: ENUM_WALLET_TYPE.CURRENCY,
			code: ENUM_WALLET_CODE.PRIMARY,
			isUsed: true,
		},
		{
			name: "监管钱包",
			type: ENUM_WALLET_TYPE.CURRENCY,
			code: ENUM_WALLET_CODE.SUPERVISION,
			isUsed: false,
		},
	];
}

function createWallets(rows, {
	transaction,
} = {}) {
	return insertMany(rows, { transaction });
}

function getWalletsByUserId(userId, {
	projections,
} = {}) {
	return find({
		where: {
			userId,
		},
		attributes: projections,
	});
}

function getWalletByUserIdAndWalletCode(userId, code, {
	transaction,
	lock,
	projections,
} = {}) {
	return findOne({
		where: {
			userId,
			code,
		},
		attributes: projections,
		transaction,
		lock,
	});
}

function getDividendableSupervisionWallet({
	projections,
} = {}) {
	return findOne({
		where: {
			code: ENUM_WALLET_CODE.SUPERVISION,
			balance: {
				[Op.gt]: 0,
			},
		},
		attributes: projections,
	});
}

async function decreaseUsedWalletBalanceByUserIdAndWalletCode(userId, code, amount, {
	projections,
	transaction,
} = {}) {
	if (amount <= 0) {
		throw new Error("amount positive required");
	}

	const result = await increment(
		{
			balance: -amount,
		},
		{
			where: {
				userId,
				code,
				isUsed: true,
				balance: {
					[Op.gte]: amount,
				},
			},
			transaction,
		}
	);

	if (result === null || result.affectedRows !== 1) {
		return null;
	}

	return getWalletByUserIdAndWalletCode(userId, code, {
		transaction,
		projections,
	});
}

async function decreaseWalletBalanceByUserIdAndWalletCode(userId, code, amount, {
	projections,
	transaction,
} = {}) {
	if (amount <= 0) {
		throw new Error("amount positive required");
	}

	const result = await increment(
		{
			balance: -amount,
		},
		{
			where: {
				userId,
				code,
				balance: {
					[Op.gte]: amount,
				},
			},
			transaction,
		}
	);

	if (result === null || result.affectedRows !== 1) {
		return null;
	}

	return getWalletByUserIdAndWalletCode(userId, code, {
		transaction,
		projections,
	});
}

async function increaseWalletBalanceByUserIdAndWalletCode(userId, code, amount, {
	projections,
	transaction,
} = {}) {
	const result = await increment({
		balance: amount,
	}, {
		where: {
			userId,
			code,
		},
		transaction,
	});

	if (result === null || result.affectedRows !== 1) {
		return null;
	}

	return getWalletByUserIdAndWalletCode(userId, code, {
		transaction,
		projections,
	});
}

async function getLessThanZeroWalletsByCodeAndPagination(code, page, {
	limit,
	sort: field,
	order: rule,
	projections
} = {}) {
	const offset = getOffsetByPageAndLimit(page, limit);
	const order = new SQLOrderClauseBuilder()
		.setOrder(field, rule)
		.build();

	const { count: numOfItems, rows: data } = await findAndCountAll({
		where: {
			code,
			balance: {
				[Op.lt]: 0,
			},
		},
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

module.exports = {
	getTransaction,
	generateDefaultWallets,
	getWalletsByUserId,
	getWalletByUserIdAndWalletCode,
	getDividendableSupervisionWallet,
	getLessThanZeroWalletsByCodeAndPagination,
	decreaseWalletBalanceByUserIdAndWalletCode,
	decreaseUsedWalletBalanceByUserIdAndWalletCode,
	increaseWalletBalanceByUserIdAndWalletCode,
	createWallets,

	MIN_PROJECTIONS,
	BALANCE_ONLY_PROJECTIONS,
};
