const {
	archiveBankCardByIdAndUserId,
} = require('../../../services/bank-card');

module.exports = async function handleUnbindBankCardBelongToUserRequest(req, res, next) {
	const { bankCardId, userId } = req.params;

	try {
		await archiveBankCardByIdAndUserId(bankCardId, userId);

		res.status(204).end();
	} catch (error) {
		return next(error);
	}

	next();
};