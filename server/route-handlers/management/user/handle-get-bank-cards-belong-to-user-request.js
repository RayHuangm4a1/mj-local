const {
	getBankCardsByUserId,
} = require("../../../services/bank-card.admin");

module.exports = async function handleGetBankCardsBelongToUserRequest(req, res, next) {
	const { userId } = req.params;
	const { sort, order } = req.query;

	try {
		const bankCards = await getBankCardsByUserId(userId, {
			sort,
			order,
		});

		res.status(200).json(bankCards);
	} catch (error) {
		next(error);
	}
};
