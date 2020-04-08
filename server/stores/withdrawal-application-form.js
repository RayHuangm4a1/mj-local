const { Op } = require("sequelize");
const {
	find,
	insertMany,
	count,
	create,
	getTransaction,
} = require("../models/withdrawal-application-form");
const PaymentAccountModel = require("../models/payment-account");
const {
	isPrimaryKeyExisted,
} = require("./common");
const {
	ENUM_WITHDRAWAL_APPLICATION_FORM_STATUS,
} = require("../lib/enum");
const AUTO_WITHDRAWAL_PROJECTIONS = [
	"id",
	"userId",
	"amount",
	"status",
	"userLevelId",
	"bankId",
	"walletCode",
	"createdAt",
];
const REMIT_PROJECTIONS = [
	"id",
	"userId",
	"userLevelId",
	"walletCode",
	"bankId",
	"bankCardId",
	"amount",
	"paymentClassId",
	"paymentAccountId",
];

function getNewWithdrawalApplicationForms({
	projections,
} = {}) {
	return find({
		where: {
			status: ENUM_WITHDRAWAL_APPLICATION_FORM_STATUS.NEW,
		},
		order: [[
			"createdAt", "asc"
		]],
		attributes: projections,
	});
}

function getReadyWithdrawalApplicationFormsWithPaymentAccountByPaymentClassId(paymentClassId, {
	projections,
} = {}) {
	return find({
		where: {
			paymentClassId,
			status: ENUM_WITHDRAWAL_APPLICATION_FORM_STATUS.READY,
		},
		order: [[
			"createdAt", "asc"
		]],
		attributes: projections,
		raw: false,
		include: [
			{
				model: PaymentAccountModel.getInstance(),
				as: "paymentAccount",
				required: false,
			},
		]
	});
}

/**
 * @param {object} withdrawalApplicationForms - The updating withdrawalApplicationForms.
 * @example withdrawalApplicationForms: [{ id, autoRemitRejectType, status, updatedAt }]
 */
function bulkUpdateWithdrawalApplicationForms(withdrawalApplicationForms) {
	if (!isPrimaryKeyExisted(withdrawalApplicationForms)) {
		throw new Error("id are required");
	}

	return insertMany(withdrawalApplicationForms, {
		updateOnDuplicate: [
			"autoRemitRejectType",
			"paymentClassId",
			"paymentAccountId",
			"status",
			"updatedAt",
		],
		ignoreDuplicates: true,
	});
}

function countPreviousWithdrawalApplicationFormsByUserId(userId) {
	return count({
		where: {
			userId,
			status: {
				[Op.notIn]: [
					ENUM_WITHDRAWAL_APPLICATION_FORM_STATUS.REMITED,
					ENUM_WITHDRAWAL_APPLICATION_FORM_STATUS.CANCELED,
				],
			},
		},
	});
}

function countPreviousWithdrawalApplicationFormsByUserIdAndBankCardId(userId, bankCardId) {
	return count({
		where: {
			userId,
			bankCardId,
			status: {
				[Op.notIn]: [
					ENUM_WITHDRAWAL_APPLICATION_FORM_STATUS.REMITED,
					ENUM_WITHDRAWAL_APPLICATION_FORM_STATUS.CANCELED,
				],
			},
		},
	});
}

function createWithdrawalApplicationForm(row, {
	transaction,
} = {}) {
	return create(row, { transaction });
}

module.exports = {
	getTransaction,
	getNewWithdrawalApplicationForms,
	getReadyWithdrawalApplicationFormsWithPaymentAccountByPaymentClassId,
	bulkUpdateWithdrawalApplicationForms,
	countPreviousWithdrawalApplicationFormsByUserId,
	countPreviousWithdrawalApplicationFormsByUserIdAndBankCardId,
	createWithdrawalApplicationForm,

	// projections
	AUTO_WITHDRAWAL_PROJECTIONS,
	REMIT_PROJECTIONS,
};
