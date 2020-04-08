const {
	getTracesByLotteryIdDatesAndPagination,
	getTracesByLotteryIdIssueDatesAndPagination,
} = require("../../../services/betting.admin");

module.exports = async function handleGetTracesRequest(req, res, next) {
	const { userId } = res.locals;
	const {
		status, lotteryId, playId,
		from, to, limit,
		page, id, username,
		issue,
	} = req.query;

	let result = {
		data: [],
		numOfItems: 0,
		numOfPages: 0,
	};

	if (userId === null && username !== undefined) {
		return res.status(200).json(result);
	}

	try {
		if (issue === undefined) {
			result = await getTracesByLotteryIdDatesAndPagination(lotteryId, from, to, page, {
				id,
				userId,
				status,
				playId,
				limit,
			});
		} else {
			result = await getTracesByLotteryIdIssueDatesAndPagination(lotteryId, issue, from, to, page, {
				id,
				userId,
				status,
				playId,
				limit,
			});
		}

		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};
