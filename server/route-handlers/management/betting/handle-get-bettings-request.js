const {
	getBettingsByLotteryIdDatesAndPagination,
} = require("../../../services/betting.admin");

module.exports = async function handleGetBettingsRequest(req, res, next) {
	const { userId } = res.locals;
	const {
		from, to, id,
		playId, lotteryId, ip,
		username, issue, amountPerBet,
		status, page, limit,
		sort, order, traceId,
		type
	} = req.query;

	if (userId === null && username !== undefined) {
		const result =  {
			data: [],
			numOfItems: 0,
			numOfPages: 0,
		};

		return res.status(200).json(result);
	}

	try {
		const result = await getBettingsByLotteryIdDatesAndPagination(lotteryId, from, to, page, {
			userId,
			id,
			playId,
			traceId,
			type,
			ip,
			username,
			issue,
			amountPerBet,
			status,
			limit,
			sort,
			order,
		});

		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};
