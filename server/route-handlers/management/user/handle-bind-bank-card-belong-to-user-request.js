const {
	bindBankCard,
} = require('../../../services/bank-card');

module.exports = async function handleBindBankCardBelongToUserRequest(req, res, next) {
	const { userId } = req.params;
	const { number } = req.body;
	const { id: bankId, name: bankName } = res.locals.bank;
	const { payer } = res.locals.managedUser;

	try {
		const result = await bindBankCard({
			userId,
			payer,
			number,
			bankId,
			bankName,
		});

		res.status(201).json(result);
	} catch (error) {
		return next(error);
	}

	next();
};