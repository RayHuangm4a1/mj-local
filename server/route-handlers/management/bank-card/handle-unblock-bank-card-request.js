const {
	unblockBankCardById,
} = require("../../../services/bank-card.admin");

module.exports = async function handleUnblockBankCardRequest(req, res, next) {
	const { bankCardId } = req.params;

	try {
		await unblockBankCardById(bankCardId);

		res.status(204).end();
	} catch (error) {
		return next(error);
	}

	next();
};
