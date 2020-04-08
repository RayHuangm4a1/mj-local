const {
	ForbiddenError
} = require("ljit-error");
const {
	getUserWithActiveBankCardsByUsername,
} = require('../../../services/user');
const {
	TRANSFER_RECEIVER_NEVER_BIND_BANK_CARD,
	TRANSFER_RECEIVER_NOT_FOUND,
	TRANSFER_RECEIVER_BANK_CARD_NUMBER_INVALID,
	TRANSFER_SELF,
} = require("../../../lib/error/code");
const {
	NUMBER_ONLY_PROJECTIONS,
} = require('../../../stores/bank-card');
const {
	ID_ONLY_PROJECTIONS,
} = require('../../../stores/user');
const {
	simplifyBankCardNumber,
} = require('../../../lib/bank-card');

async function prepareTransferRequiredReceiver(req, res, next) {
	const { username, bankCardNumber } = req.body;

	try {
		const receiver = await getUserWithActiveBankCardsByUsername(username, {
			userProjections: ID_ONLY_PROJECTIONS,
			BankCardProjections: NUMBER_ONLY_PROJECTIONS,
		});

		if (receiver === null) {
			throw new ForbiddenError(TRANSFER_RECEIVER_NOT_FOUND.MESSAGE, TRANSFER_RECEIVER_NOT_FOUND.CODE);
		}

		if (!receiver.bankCards.length) {
			throw new ForbiddenError(TRANSFER_RECEIVER_NEVER_BIND_BANK_CARD.MESSAGE, TRANSFER_RECEIVER_NEVER_BIND_BANK_CARD.CODE);
		}

		const isBankCardNumberMatched = receiver.bankCards.some(bankCard => {
			const lastSixDigits = simplifyBankCardNumber(bankCard.number, 6);

			return lastSixDigits === bankCardNumber;
		});

		if (!isBankCardNumberMatched) {
			throw new ForbiddenError(TRANSFER_RECEIVER_BANK_CARD_NUMBER_INVALID.MESSAGE, TRANSFER_RECEIVER_BANK_CARD_NUMBER_INVALID.CODE);
		}

		res.locals.receiver = {
			id: receiver.id,
			username,
		};

		next();
	} catch (error) {
		return next(error);
	}
}

function couldNotTransferToSelf(req, res, next) {
	if (req.body.username === req.user.username) {
		return next(new ForbiddenError(TRANSFER_SELF.MESSAGE, TRANSFER_SELF.CODE));
	}

	next();
}

module.exports = {
	prepareTransferRequiredReceiver,
	couldNotTransferToSelf,
};
