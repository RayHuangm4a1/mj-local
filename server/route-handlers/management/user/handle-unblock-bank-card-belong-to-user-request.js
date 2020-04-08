const {
	ENUM_BANK_CARD_STATUS,
} = require('../../../lib/enum');
const {
	unblockBankCardById,
} = require("../../../services/bank-card.admin");

module.exports = async function handleUnblockBankCardBelongToUserRequest(req, res, next) {
	const { bankCardId } = req.params;
	const { bankCard } = res.locals;

	try {
		await unblockBankCardById(bankCardId);

		bankCard.status = ENUM_BANK_CARD_STATUS.ACTIVE;

		res.status(200).json(bankCard);
	} catch (error) {
		return next(error);
	}

	next();
};
