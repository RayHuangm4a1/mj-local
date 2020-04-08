const {
	USER_PROJECTIONS,

	getChildrenWithWalletsByUserIdAndPagination,
	addOnlineStatusToUsers,
} = require("../../../services/user");
const {
	ENUM_WALLET_CODE,
} = require("../../../lib/enum");

module.exports = async function handleGetChildrenBelongToUserRequest(req, res, next) {
	const {
		deltaBonus,
		minBalance,
		maxBalance,
		sort,
		order,
		page,
		limit,
	} = req.query;
	const {
		ancestorsOfQueriedDescendant: ancestors,
		queriedDescendant
	} = req;

	if (!ancestors.length || queriedDescendant === null) {
		return res.status(200).json({
			data: {
				children: [],
				ancestors: [],
			},
			numOfPages: 0,
			numOfItems: 0,
		});
	}

	try {
		let { children, numOfPages, numOfItems } = await getChildrenWithWalletsByUserIdAndPagination(
			queriedDescendant.id,
			page,
			{
				me: true,
				deltaBonus,
				minBalance,
				maxBalance,
				sort,
				order,
				limit,
				walletCode: ENUM_WALLET_CODE.PRIMARY,
				projections: USER_PROJECTIONS.CHILDREN,
			}
		);

		children = await addOnlineStatusToUsers(children);

		res.status(200).json({
			data: {
				children,
				ancestors,
			},
			numOfPages,
			numOfItems,
		});
	} catch (error) {
		next(error);
	}
};
