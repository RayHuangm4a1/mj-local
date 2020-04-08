const {
	getBlockedBankCardsByPagination,
} = require("../../../services/bank-card.admin");

module.exports = async function handleGetBlockedBankCardsRequest(req, res, next) {
	const {
		blockedPayer,
		number,
		bankId,
		blockedAtFrom,
		blockedAtTo,
		description,
		page,
		limit,
		sort,
		order,
	} = req.query;

	try {
		const result = await getBlockedBankCardsByPagination(page, {
			blockedPayer,
			number,
			bankId,
			blockedAtFrom,
			blockedAtTo,
			description,
			limit,
			sort,
			order,
		});

		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};
