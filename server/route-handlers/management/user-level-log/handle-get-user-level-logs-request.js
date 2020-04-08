const {
	getUserLevelLogsByPagination,
} = require("../../../services/user-level-log.admin");

module.exports = async function handleGetUserLevelLogsRequest(req, res, next) {
	const {
		page, limit, from,
		to, status, afterLevelId,
		previousLevelId, username, sort,
		order,
	} = req.query;
	const { userId } = res.locals;

	if (userId === null && username !== undefined) {
		const result =  {
			data: [],
			numOfItems: 0,
			numOfPages: 0,
		};

		return res.status(200).json(result);
	}

	try {
		const result = await getUserLevelLogsByPagination(page, {
			limit,
			from,
			to,
			status,
			afterLevelId,
			previousLevelId,
			userId,
			sort,
			order,
		});

		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};
