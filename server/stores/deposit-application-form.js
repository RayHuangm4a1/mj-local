const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {
	find,
	create,
	update,
	getTransaction,
	findAndCountAll,
	findOne,
} = require('../models/deposit-application-form');
const {
	ENUM_DEPOSIT_APPLICATION_FORM_STATUS,
} = require("../lib/enum");
const {
	getOffsetByPageAndLimit,
} = require('./index');
const BankAccountModel = require("../models/bank-account");
const DepositClassModel = require("../models/deposit-class");
const {
	getDepositFee,
	getDamaAmount,
} = require("../lib/deposit");

const SQLWhereClauseBuilder = require("../lib/sequlize-query-builder/sql-where-clause-builder");
const SQLOrderClauseBuilder = require("../lib/sequlize-query-builder/sql-order-clause-builder");

function getPreviousDepositApplicationFormsByUserId(userId, {
	projections,
	transaction,
	lock,
} = {}) {
	return find({
		where: {
			userId,
			status: ENUM_DEPOSIT_APPLICATION_FORM_STATUS.NEW,
		},
		projections,
		transaction,
		lock,
	});
}

function cancelPreviousDepositApplicationFormsWithinIdsAndUserId(ids, userId, {
	transaction,
} = {}) {
	return update({
		status: ENUM_DEPOSIT_APPLICATION_FORM_STATUS.CANCELED,
	}, {
		where: {
			id: {
				[Op.in]: ids,
			},
			userId,
			status: ENUM_DEPOSIT_APPLICATION_FORM_STATUS.NEW,
		},
		transaction,
	});
}

function createDepositApplicationForm(row, {
	transaction,
} = {}) {
	return create(row, { transaction });
}

async function getDepositApplicationFormsByDepartmentIdDepositClassIdAndPagination(departmentId, depositClassId, page, {
	createdAtFrom,
	createdAtTo,
	confirmedAtFrom,
	confirmedAtTo,
	limit,
	sort: field,
	order: rule,
	username,
	levelId,
	id,
	bankId,
	payer,
	amount,
	status,
	projections,
} = {}) {
	const where = new SQLWhereClauseBuilder()
		.setEqual('departmentId', departmentId)
		.setEqual('depositClassId', depositClassId)
		.setGte('createdAt', createdAtFrom)
		.setLte('createdAt', createdAtTo)
		.setGte('confirmedAt', confirmedAtFrom)
		.setLte('confirmedAt', confirmedAtTo)
		.setEqual('username', username)
		.setEqual('userLevelId', levelId)
		.setEqual('id', id)
		.setEqual('bankId', bankId)
		.setEqual('payer', payer)
		.setEqual('amount', amount)
		.setIn('status', status)
		.build();

	const order = new SQLOrderClauseBuilder()
		.setOrder(field, rule)
		.build();

	const offset = getOffsetByPageAndLimit(page, limit);
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

function getNewDepositApplicationFormByIdDepartmentIdAndDepositClassId(id, departmentId, depositClassId, {
	projections,
} = {}) {
	return findOne({
		where: {
			id,
			departmentId,
			depositClassId,
			status: ENUM_DEPOSIT_APPLICATION_FORM_STATUS.NEW,
		},
		attributes: projections,
	});
}

async function getMergeRequiredInconsistentDepositApplicationFormById(id, {
	depositApplicationFormProjections,
	depositClassProjections,
	bankAccountProjections,
} = {}) {
	let result = await findOne({
		where: {
			id,
			status: ENUM_DEPOSIT_APPLICATION_FORM_STATUS.INCONSISTENT,
		},
		attributes: depositApplicationFormProjections,
		raw: false,
		include: [
			{
				model: BankAccountModel.getInstance(),
				attributes: bankAccountProjections,
				as: "bankAccount",
				required: true,
				// inner join
			},
			{
				model: DepositClassModel.getInstance(),
				attributes: depositClassProjections,
				as: "depositClass",
				required: true,
				// inner join
			},
		],
	});

	if (result !== null) {
		result = result.toJSON();
	}

	return result;
}

function getDepositApplicationFormById(id, {
	transaction,
	projections,
} = {}) {
	return findOne({
		where: {
			id,
		},
		attributes: projections,
		transaction,
	});
}

async function mergeNewToInconsistentDepositApplicationForm(newDepositApplicationForm, mergeRequiredInconsistentDepositApplicationForm, {
	operator,
	transaction,
} = {}) {
	const { id, amount, bankAccount } = mergeRequiredInconsistentDepositApplicationForm;
	const { percentageOfFee, percentageOfDama } = bankAccount;

	const preparedConfirmedForm = {
		userId: newDepositApplicationForm.userId,
		username: newDepositApplicationForm.username,
		userLevelId: newDepositApplicationForm.userLevelId,
		operatorId: operator.id,
		operatorUsername: operator.username,
		fee: getDepositFee({ amount, percentageOfFee }),
		damaAmount: getDamaAmount({ amount, percentageOfDama }),
		status: ENUM_DEPOSIT_APPLICATION_FORM_STATUS.CONFIRMED,
		confirmedAt: new Date(),
	};

	const result = await update(preparedConfirmedForm, {
		where: {
			id,
		},
		transaction,
	});

	if (result === null || result.affectedRows !== 1) {
		return null;
	}

	return getDepositApplicationFormById(id, { transaction });
}

function setDepositApplicationFormFromNewToMergedById(id, { operator }, {
	transaction,
} = {}) {
	return update({
		operatorId: operator.id,
		operatorUsername: operator.username,
		status: ENUM_DEPOSIT_APPLICATION_FORM_STATUS.MERGED,
		confirmedAt: new Date(),
	}, {
		where: {
			id,
			status: ENUM_DEPOSIT_APPLICATION_FORM_STATUS.NEW,
		},
		transaction,
	});
}

module.exports = {
	getTransaction,
	createDepositApplicationForm,
	getDepositApplicationFormsByDepartmentIdDepositClassIdAndPagination,
	getPreviousDepositApplicationFormsByUserId,
	cancelPreviousDepositApplicationFormsWithinIdsAndUserId,
	getMergeRequiredInconsistentDepositApplicationFormById,
	getNewDepositApplicationFormByIdDepartmentIdAndDepositClassId,
	mergeNewToInconsistentDepositApplicationForm,
	setDepositApplicationFormFromNewToMergedById,

	// projections
	DEPOSIT_AMOUNT_ID_ONLY_PROJECTIONS: [
		"id", "depositAmountId",
	],
};
