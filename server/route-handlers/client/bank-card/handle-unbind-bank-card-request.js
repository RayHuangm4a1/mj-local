const {
	archiveBankCardByIdAndUserId,
} = require("../../../services/bank-card");

module.exports = async function handleUnbindBankCardRequest(req, res, next) {
	const { id: userId } = req.user;
	const { bankCardId } = req.params;

	try {
		await archiveBankCardByIdAndUserId(bankCardId, userId);

		res.status(204).end();
	} catch (error) {
		next(error);
	}
};
