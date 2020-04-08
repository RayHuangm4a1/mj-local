const {
	bindBankCard,
} = require("../../../services/bank-card");

module.exports = async function handleUpdateBankCardNumberBelongToUserRequest(req, res, next) {
	const { userId, bankCardId } = req.params;
	const { number } = req.body;
	const { payer } = res.locals.managedUser;
	const { id: bankId, name: bankName } = res.locals.bank;

	try {
		const bankCard = await bindBankCard({
			userId,
			payer,
			number,
			bankId,
			bankName,
			replacedBankCardId: bankCardId,
		});

		res.status(200).json(bankCard);
	} catch (error) {
		return next(error);
	}

	next();
};
