const {
	USER_PROJECTIONS,

	getChildrenWithWalletsByUserIdAndPagination,
} = require("../../../services/user");
const {
	ENUM_WALLET_CODE,
} = require("../../../lib/enum");

/**
 * @param {object} res.locals.queriedChild
 */
module.exports = async function handleGetChildrenFixedWageRequest(req, res, next) {
	const { id: userId } = req.user;
	const {
		sort, order, page,
		limit, username,
	} = req.query;

	try {
		const { children, numOfPages, numOfItems } = await getChildrenWithWalletsByUserIdAndPagination(userId, page, {
			limit,
			username,
			sort,
			order,
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			projections: USER_PROJECTIONS.CHILDREN_FIXED_WAGE,
		});

		res.status(200).json({
			data: {
				children,
			},
			numOfPages,
			numOfItems,
		});
	} catch (error) {
		next(error);
	}
};
