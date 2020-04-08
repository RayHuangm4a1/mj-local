const {
	ENUM_BANK_CARD_STATUS,
} = require('../../../lib/enum');
const {
	blockActiveBankCardById,
} = require("../../../services/bank-card.admin");

module.exports = async function handleBlockBankCardBelongToUserRequest(req, res, next) {
	const { bankCardId } = req.params;
	const { bankCard, managedUser } = res.locals;
	const { id: userId, username } = req.user;

	try {
		await blockActiveBankCardById(bankCardId, {
			blockedPayer: managedUser.payer,
			operatorId: userId,
			operatorUsername: username,
		});

		bankCard.status = ENUM_BANK_CARD_STATUS.BLOCKED,

		res.status(201).json(bankCard);
	} catch (error) {
		return next(error);
	}

	next();
};
