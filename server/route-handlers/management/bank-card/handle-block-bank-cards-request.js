const {
	blockBankCards,
} = require("../../../services/bank-card.admin");

module.exports = async function handleBlockBankCardsRequest(req, res, next) {
	const { preparedBankCards } = res.locals;

	try {
		await blockBankCards(preparedBankCards);

		res.status(204).end();
	} catch (error) {
		return next(error);
	}

	next();
};
