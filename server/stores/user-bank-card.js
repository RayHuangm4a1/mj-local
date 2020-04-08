const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const {
	update,
	findOne,
	findCreateFind,
	getTransaction,
} = require('../models/user-bank-card');
const {
	getDateAfterNHours,
} = require('../lib/date');
const {
	ENUM_BANK_CARD_STATUS,
} = require('../lib/enum');

const WAITING_TIME_IN_HOURS_FOR_NTH_BINDING = {
	FIRST: 6,
	SECOND: 48,
	OTHERS: 120,
};
const WITHDRAWABLE_AT_ONLY_PROJECTIONS = [
	"withdrawableAt",
];
const MIN_PROJECTIONS = [
	'activatedAt',
	'withdrawableAt',
];

function createUserBankCardIfNotExist(row, {
	transaction,
	projections,
} = {}) {
	const { userId, bankCardId } = row;

	return findCreateFind({
		where: {
			userId,
			bankCardId,
		},
		defaults: {
			numOfBindings: 1,
			withdrawableAt: getDateAfterNHours(WAITING_TIME_IN_HOURS_FOR_NTH_BINDING.FIRST),
			activatedAt: new Date(),
			status: ENUM_BANK_CARD_STATUS.ACTIVE,
		},
		transaction,
		attributes: projections,
	});
}

function getUserBankCardByUserIdAndBankCardId(userId, bankCardId, {
	transaction,
	projections,
} = {}) {
	return findOne({
		where: {
			userId,
			bankCardId,
		},
		transaction,
		attributes: projections,
	});
}

async function rebindUserBankCardByUserIdAndBankCardId(userId, bankCardId, {
	transaction,
} = {}) {
	try {
		const { SECOND, OTHERS } = WAITING_TIME_IN_HOURS_FOR_NTH_BINDING;
		const result = await update({
			numOfBindings: Sequelize.literal('numOfBindings + 1'),
			withdrawableAt: Sequelize.literal(`IF (numOfBindings = 2, NOW() + INTERVAL ${SECOND} HOUR, NOW() + INTERVAL ${OTHERS} HOUR)`),
			activatedAt: new Date(),
			status: ENUM_BANK_CARD_STATUS.ACTIVE,
		}, {
			where: {
				userId,
				bankCardId,
			},
			transaction,
		});

		if (result === null || result.affectedRows !== 1) {
			return null;
		}

		return getUserBankCardByUserIdAndBankCardId(userId, bankCardId, { transaction });
	} catch (error) {
		throw error;
	}
}

function archiveUserBankCardByBankCardIdAndUserId(bankCardId, userId, {
	transaction,
} = {}) {
	return update({
		status: ENUM_BANK_CARD_STATUS.ARCHIVED,
	}, {
		where: {
			bankCardId,
			userId,
			status: ENUM_BANK_CARD_STATUS.ACTIVE,
		},
		transaction,
	});
}

function setWithdrawableAtToCurrentDateByBankCardIdAndUserId(bankCardId, userId) {
	return update({
		withdrawableAt: new Date(),
	}, {
		where: {
			bankCardId,
			userId,
			status: ENUM_BANK_CARD_STATUS.ACTIVE,
		},
	});
}

function blockActiveUserBankCardsByBankCardId(bankCardId, {
	transaction,
} = {}) {
	return update({
		status: ENUM_BANK_CARD_STATUS.BLOCKED,
	}, {
		where: {
			bankCardId,
			status: ENUM_BANK_CARD_STATUS.ACTIVE,
		},
		transaction,
	});
}

function unblockUserBankCardsByBankCardId(bankCardId, {
	transaction,
} = {}) {
	return update({
		status: ENUM_BANK_CARD_STATUS.ACTIVE,
	}, {
		where: {
			bankCardId,
			status: ENUM_BANK_CARD_STATUS.BLOCKED,
		},
		transaction,
	});
}

function blockUserBankCardsWithinBankCardIds(bankCardIds, {
	transaction,
} = {}) {
	return update({
		status: ENUM_BANK_CARD_STATUS.BLOCKED,
	}, {
		where: {
			bankCardId: {
				[Op.in]: bankCardIds,
			},
			status: ENUM_BANK_CARD_STATUS.ACTIVE,
		},
		transaction,
	});
}

module.exports = {
	getTransaction,
	createUserBankCardIfNotExist,
	getUserBankCardByUserIdAndBankCardId,
	rebindUserBankCardByUserIdAndBankCardId,
	archiveUserBankCardByBankCardIdAndUserId,
	setWithdrawableAtToCurrentDateByBankCardIdAndUserId,
	blockActiveUserBankCardsByBankCardId,
	unblockUserBankCardsByBankCardId,
	blockUserBankCardsWithinBankCardIds,

	WITHDRAWABLE_AT_ONLY_PROJECTIONS,
	MIN_PROJECTIONS,
};
