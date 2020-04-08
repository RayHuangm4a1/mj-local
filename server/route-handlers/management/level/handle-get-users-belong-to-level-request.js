const {
	USER_PROJECTIONS,

	getUsersWithWalletsByLevelIdAndPagination,
} = require("../../../services/user.admin");

module.exports = async function handleGetUsersBelongToLevelRequest(req, res, next) {
	const {
		limit, sort, order,
		page, loginAtFrom, loginAtTo,
		username,
	} = req.query;
	const { userId: id } = res.locals;
	const { levelId } = req.params;

	if (id === null && username !== undefined) {
		const result =  {
			data: [],
			numOfItems: 0,
			numOfPages: 0,
		};

		return res.status(200).json(result);
	}

	try {
		const result = await getUsersWithWalletsByLevelIdAndPagination(levelId, page, {
			id,
			limit,
			sort,
			order,
			loginAtFrom,
			loginAtTo,
			projections: USER_PROJECTIONS.LOGIN_AT,
		});

		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};
