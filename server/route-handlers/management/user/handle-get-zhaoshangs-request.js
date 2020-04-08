const {
	getZhaoshangsByPagnation,

	USER_PROJECTIONS,
} = require("../../../services/user.admin");

module.exports = async function handleGetZhaoshangsRequest(req, res, next) {
	const { page, order, sort, limit } = req.query;

	try {
		const { zhaoshangs, numOfItems, numOfPages } = await getZhaoshangsByPagnation(page,
			{
				limit,
				order,
				sort,
				projections: USER_PROJECTIONS.ZHAOSHANG,
			}
		);

		res.status(200).json({
			data: {
				zhaoshangs,
			},
			numOfItems,
			numOfPages,
		});
	} catch (error) {
		next(error);
	}
};
