const {
	BETTING_PROJECTIONS,
	getBettingsWithinUserIdsDatesAndPagination,
} = require("../../../services/betting");

/**
 * @param {array} res.locals.descendantIds
 */
module.exports = async function handleGetDescendantBettingsRequest(req, res, next) {
	const { descendantIds } = res.locals;
	const {
		limit, sort, order,
		lotteryId, id, issue,
		from, to, page,
		status,
	} = req.query;

	if (!descendantIds.length) {
		return res.status(200).json({
			data: [],
			numOfItems: 0,
			numOfPages: 0,
		});
	}

	try {
		const result = await getBettingsWithinUserIdsDatesAndPagination(descendantIds, from, to, page, {
			id,
			issue,
			lotteryId,
			limit,
			sort,
			order,
			status,
			projections: BETTING_PROJECTIONS.IGNORE_ANCESTORS_AND_AWARD,
		});

		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};
