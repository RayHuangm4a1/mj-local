const {
	find,
	findCreateFind,
	findAndCountAll,
	update,
	count,
	insertMany,
	getTransaction,
} = require('../models/bank-card');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const SQLWhereClauseBuilder = require('../lib/sequlize-query-builder/sql-where-clause-builder');
const SQLOrderClauseBuilder = require('../lib/sequlize-query-builder/sql-order-clause-builder');
const {
	getOffsetByPageAndLimit,
} = require('./index');
const {
	ENUM_BANK_CARD_STATUS,
} = require('../lib/enum');

const MIN_PROJECTIONS = [
	"id", "bankId", "bankName",
	"number",
];
const NUMBER_ONLY_PROJECTIONS = ['number'];

function createBankCardIfNotExist(row, {
	transaction,
	projections,
} = {}) {
	const { number } = row;

	return findCreateFind({
		where: {
			number,
		},
		defaults: row,
		raw: false,
		transaction,
		attributes: projections,
	});
}

function blockActiveBankCardById(id, {
	blockedPayer,
	operatorId,
	operatorUsername,
}, {
	transaction,
} = {}) {
	return update({
		status: ENUM_BANK_CARD_STATUS.BLOCKED,
		blockedPayer,
		operatorId,
		operatorUsername,
		description: '',
		blockedAt: new Date(),
	}, {
		where: {
			id,
			status: ENUM_BANK_CARD_STATUS.ACTIVE,
		},
		transaction,
	});
}

function unblockBankCardById(id, {
	transaction,
} = {}) {
	return update({
		status: ENUM_BANK_CARD_STATUS.ACTIVE,
		blockedPayer: null,
		description: null,
		operatorId: null,
		operatorUsername: null,
		blockedAt: null,
	}, {
		where: {
			id,
			status: ENUM_BANK_CARD_STATUS.BLOCKED,
		},
		transaction,
	});
}

function countBlockedBankCardByNumber(number) {
	return count({
		where: {
			number,
			status: ENUM_BANK_CARD_STATUS.BLOCKED,
		},
	});
}

function getBlockedBankCardsWithinNumbers(numbers, {
	projections,
	transaction,
} = {}) {
	return find({
		where: {
			number: {
				[Op.in]: numbers,
			},
			status: ENUM_BANK_CARD_STATUS.BLOCKED,
		},
		attributes: projections,
		transaction,
	});
}

async function blockBankCards(bankCards, {
	transaction,
}) {
	return insertMany(bankCards, {
		updateOnDuplicate: [
			'status', 'blockedPayer', 'description',
			'operatorId', 'operatorUsername', 'blockedAt',
		],
		transaction,
	});
}

async function getBlockedBankCardsByPagination(page, {
	blockedPayer,
	number,
	bankId,
	blockedAtFrom,
	blockedAtTo,
	description,
	limit,
	sort: field,
	order: rule,
	projections,
} = {}) {
	const where = new SQLWhereClauseBuilder()
		.setEqual('status', ENUM_BANK_CARD_STATUS.BLOCKED)
		.setEqual('blockedPayer', blockedPayer)
		.setEqual('number', number)
		.setEqual('bankId', bankId)
		.setGte('blockedAt', blockedAtFrom)
		.setLte('blockedAt', blockedAtTo)
		.setEqual('description', description)
		.build();

	const offset = getOffsetByPageAndLimit(page, limit);
	const order = new SQLOrderClauseBuilder()
		.setOrder(field, rule)
		.build();

	const { count: numOfItems, rows: data } = await findAndCountAll({
		where,
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

module.exports = {
	getTransaction,
	createBankCardIfNotExist,
	blockActiveBankCardById,
	unblockBankCardById,
	countBlockedBankCardByNumber,
	getBlockedBankCardsWithinNumbers,
	blockBankCards,
	getBlockedBankCardsByPagination,

	MIN_PROJECTIONS,
	NUMBER_ONLY_PROJECTIONS,
};
