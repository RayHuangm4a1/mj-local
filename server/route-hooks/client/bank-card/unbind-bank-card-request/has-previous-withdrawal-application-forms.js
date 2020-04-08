const {
	ForbiddenError,
} = require("ljit-error");
const {
	countPreviousWithdrawalApplicationFormsByUserIdAndBankCardId,
} = require("../../../../services/withdrawal");
const {
	BANK_CARD_HAS_BE_WITHDRAWAL_APPLICATION_FORM_USED,
} = require("../../../../lib/error/code");

module.exports = async function hasPreviousWithdrawalApplicationForms(req, res, next) {
	const { id: userId } = req.user;
	const { bankCardId } = req.params;

	try {
		const count = await countPreviousWithdrawalApplicationFormsByUserIdAndBankCardId(userId, bankCardId);

		if (count > 0) {
			throw new ForbiddenError(
				BANK_CARD_HAS_BE_WITHDRAWAL_APPLICATION_FORM_USED.MESSAGE,
				BANK_CARD_HAS_BE_WITHDRAWAL_APPLICATION_FORM_USED.CODE
			);
		}
	} catch (error) {
		return next(error);
	}

	next();
};
