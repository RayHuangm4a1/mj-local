const {
	getActiveBankCardByIdAndUserId,
	setWithdrawableAtToCurrentDateByBankCardIdAndUserId,
} = require("../../../services/bank-card.admin");

module.exports = async function handleEnableBankCardWithdrawalBelongToUserRequest(req, res, next) {
	const { bankCardId, userId } = req.params;

	try {
		await setWithdrawableAtToCurrentDateByBankCardIdAndUserId(bankCardId, userId);

		const bankCard = await getActiveBankCardByIdAndUserId(bankCardId, userId);

		res.status(201).json(bankCard);
	} catch (error) {
		return next(error);
	}

	next();
};
