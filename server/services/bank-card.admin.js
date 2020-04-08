const UserStore = require('../stores/user');
const BankCardStore = require('../stores/bank-card');
const UserBankCardStore = require('../stores/user-bank-card');
const {
	NotFoundError,
} = require('ljit-error');
const {
	BANK_CARD_NOT_FOUND,
} = require('../lib/error/code');
const {
	composeUserBankCard,
} = require('../lib/withdrawal');

async function getActiveBankCardByIdAndUserId(bankCardId, userId) {
	const user = await UserStore.getUserWithActiveBankCardByIdAndBankCardId(userId, bankCardId, {
		projections: UserStore.PAYER_ONLY_PROJECTIONS,
	});

	if (!user.bankCards.length) {
		throw new NotFoundError(BANK_CARD_NOT_FOUND.MESSAGE, BANK_CARD_NOT_FOUND.CODE);
	}

	const bankCard = user.bankCards[0];

	return composeUserBankCard({
		bankCard,
		payer: user.payer,
		userBankCard: bankCard.userBankCard,
	});
}

async function getBlockedBankCardByIdAndUserId(bankCardId, userId) {
	const user = await UserStore.getUserWithBlockedBankCardByIdAndBankCardId(userId, bankCardId, {
		projections: UserStore.PAYER_ONLY_PROJECTIONS,
	});

	if (!user.bankCards.length) {
		throw new NotFoundError(BANK_CARD_NOT_FOUND.MESSAGE, BANK_CARD_NOT_FOUND.CODE);
	}

	const bankCard = user.bankCards[0];

	return composeUserBankCard({
		bankCard,
		payer: user.payer,
		userBankCard: bankCard.userBankCard,
	});
}

async function getBankCardsByUserId(userId, {
	sort,
	order,
}) {
	const user = await UserStore.getUserWithBankCardsById(userId, {
		sort,
		order,
		projections: UserStore.PAYER_ONLY_PROJECTIONS,
	});

	return user.bankCards.map(bankCard => {
		return composeUserBankCard({
			bankCard,
			payer: user.payer,
			userBankCard: bankCard.userBankCard,
		});
	});
}

async function setWithdrawableAtToCurrentDateByBankCardIdAndUserId(bankCardId, userId) {
	const result = await UserBankCardStore.setWithdrawableAtToCurrentDateByBankCardIdAndUserId(bankCardId, userId);

	if (result === null || result.affectedRows !== 1) {
		throw new NotFoundError(BANK_CARD_NOT_FOUND.MESSAGE, BANK_CARD_NOT_FOUND.CODE);
	}
}

async function blockActiveBankCardById(bankCardId, {
	blockedPayer,
	operatorId,
	operatorUsername,
}) {
	const txn = BankCardStore.getTransaction();
	const operations = async function (transaction) {
		await BankCardStore.blockActiveBankCardById(bankCardId, {
			blockedPayer,
			operatorId,
			operatorUsername,
		}, {
			transaction,
		});
		await UserBankCardStore.blockActiveUserBankCardsByBankCardId(bankCardId, { transaction });
	};

	try {
		await txn.startTransaction(operations);

		return txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

async function unblockBankCardById(bankCardId) {
	const txn = BankCardStore.getTransaction();
	const operations = async function (transaction) {
		const result = await BankCardStore.unblockBankCardById(bankCardId, { transaction });

		if (result === null || result.affectedRows !== 1) {
			throw new NotFoundError(BANK_CARD_NOT_FOUND.MESSAGE, BANK_CARD_NOT_FOUND.CODE);
		}

		await UserBankCardStore.unblockUserBankCardsByBankCardId(bankCardId, { transaction });
	};

	try {
		await txn.startTransaction(operations);

		return txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

async function isBankCardBlockedByNumber(number) {
	const numOfBlockedBankCard = await BankCardStore.countBlockedBankCardByNumber(number);

	return numOfBlockedBankCard === 1;
}

async function blockBankCards(bankCards) {
	const txn = BankCardStore.getTransaction();
	const operations = async function (transaction) {
		await BankCardStore.blockBankCards(bankCards, { transaction });

		const bankCardNumbers = bankCards.map(({ number }) => number);
		const blockedBankCards = await BankCardStore.getBlockedBankCardsWithinNumbers(bankCardNumbers, { transaction });
		const blockedBankCardIds = blockedBankCards.map(({ id }) => id);

		await UserBankCardStore.blockUserBankCardsWithinBankCardIds(blockedBankCardIds, { transaction });
	};

	try {
		await txn.startTransaction(operations);

		return txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

module.exports = {
	getActiveBankCardByIdAndUserId,
	getBlockedBankCardByIdAndUserId,
	getBankCardsByUserId,
	setWithdrawableAtToCurrentDateByBankCardIdAndUserId,
	blockActiveBankCardById,
	unblockBankCardById,
	isBankCardBlockedByNumber,
	blockBankCards,

	getBlockedBankCardsByPagination: BankCardStore.getBlockedBankCardsByPagination,
};