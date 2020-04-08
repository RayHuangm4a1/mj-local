const {
	TRANSACTION_LOG_PROJECTIONS,
	getFinishedTransactionLogsByUserIdDatesAndPagination,
} = require("../../../services/transaction-log");

module.exports = async function handleGetDividendTransactionLogsRequest(req, res, next) {
	const { id: userId } = req.user;
	const { types } = res.locals;
	const {
		id, from, to,
		page, limit, sort,
		order,
	} = req.query;

	try {
		const result = await getFinishedTransactionLogsByUserIdDatesAndPagination(userId, from, to, page, {
			types,
			id,
			sort,
			order,
			limit,
			projections: TRANSACTION_LOG_PROJECTIONS.MIN,
		});

		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};
