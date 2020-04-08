const UserStore = require('../stores/user');
const BankCardStore = require('../stores/bank-card');
const UserBankCardStore = require('../stores/user-bank-card');

const {
	composeUserBankCard,
} = require('../lib/withdrawal');
const {
	ConflictError,
	ForbiddenError,
	NotFoundError,
} = require('ljit-error');
const {
	ENUM_BANK_CARD_STATUS,
} = require('../lib/enum');
const {
	BANK_CARD_IS_BLOCKED,
	BANK_CARD_ALREADY_BOUND,
	BANK_CARD_NOT_FOUND,
} = require('../lib/error/code');

async function getActiveBankCardsByUserId(userId) {
	try {
		const user = await UserStore.getUserWithActiveBankCardsById(userId, {
			userProjections: UserStore.PAYER_ONLY_PROJECTIONS,
			userBankCardProjections: UserBankCardStore.MIN_PROJECTIONS,
		});

		return user.bankCards.map(bankCard => {
			return composeUserBankCard({
				bankCard,
				payer: user.payer,
				userBankCard: bankCard.userBankCard,
			});
		});
	} catch (error) {
		throw error;
	}
}

async function bindBankCard({
	userId,
	payer,
	number,
	bankId,
	bankName,
	replacedBankCardId,
}) {
	const txn = UserBankCardStore.getTransaction();

	const operations = async (transaction) => {
		if (replacedBankCardId !== undefined) {
			const result = await UserBankCardStore.archiveUserBankCardByBankCardIdAndUserId(replacedBankCardId, userId, {
				transaction,
			});

			if (result === null) {
				throw new NotFoundError(BANK_CARD_NOT_FOUND.MESSAGE, BANK_CARD_NOT_FOUND.CODE);
			}
		}

		await UserStore.setPayerByIdIfEmpty(userId, payer, { transaction });

		const [bankCard] = await BankCardStore.createBankCardIfNotExist({
			number,
			bankId,
			bankName,
		}, {
			transaction,
		});

		if (bankCard.status === ENUM_BANK_CARD_STATUS.BLOCKED) {
			throw new ForbiddenError(
				BANK_CARD_IS_BLOCKED.MESSAGE,
				BANK_CARD_IS_BLOCKED.CODE
			);
		}

		let [
			userBankCard,
			isFirstTimeBindingThisCard,
		] = await UserBankCardStore.createUserBankCardIfNotExist({
			userId,
			bankCardId: bankCard.id,
		}, {
			transaction,
		});

		if (!isFirstTimeBindingThisCard) {
			if (userBankCard.status === ENUM_BANK_CARD_STATUS.ACTIVE) {
				throw new ConflictError(
					BANK_CARD_ALREADY_BOUND.MESSAGE,
					BANK_CARD_ALREADY_BOUND.CODE
				);
			}

			if (userBankCard.status === ENUM_BANK_CARD_STATUS.BLOCKED) {
				throw new ForbiddenError(
					BANK_CARD_IS_BLOCKED.MESSAGE,
					BANK_CARD_IS_BLOCKED.CODE
				);
			}

			userBankCard = await UserBankCardStore.rebindUserBankCardByUserIdAndBankCardId(userId, bankCard.id, {
				transaction,
			});

			if (userBankCard === null) {
				throw new NotFoundError(BANK_CARD_NOT_FOUND.MESSAGE, BANK_CARD_NOT_FOUND.CODE);
			}
		}

		return composeUserBankCard({
			bankCard,
			payer,
			userBankCard,
		});
	};

	try {
		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();
		throw error;
	}
}

async function archiveBankCardByIdAndUserId(bankCardId, userId) {
	try {
		const result = await UserBankCardStore.archiveUserBankCardByBankCardIdAndUserId(bankCardId, userId);

		if (result === null) {
			throw new NotFoundError(BANK_CARD_NOT_FOUND.MESSAGE, BANK_CARD_NOT_FOUND.CODE);
		}
	} catch (error) {
		throw error;
	}
}

module.exports = {
	getActiveBankCardsByUserId,
	bindBankCard,
	archiveBankCardByIdAndUserId,

	BANK_CARD_PROJECTIONS: {
		MIN: BankCardStore.MIN_PROJECTIONS,
	},
	USER_BANK_CARD_PROJECTIONS: {
		WITHDRAWABLE_AT: UserBankCardStore.WITHDRAWABLE_AT_ONLY_PROJECTIONS,
	},
};
