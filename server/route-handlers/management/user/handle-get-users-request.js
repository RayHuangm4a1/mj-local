const {
	addOnlineStatusToUsers,
} = require("../../../services/user");
const {
	getUsersWithWalletsBankCardsAndTeamStatsByPagination,
} = require("../../../services/user.admin");

module.exports = async function handleGetUsersRequest(req, res, next) {
	let {
		username,
		type,
		isNormal,
		payer,
		bankCardNumber,
		page,
		sort,
		order,
		limit,
	} = req.query;

	try {
		let { users, numOfPages, numOfItems } = await getUsersWithWalletsBankCardsAndTeamStatsByPagination(page, {
			username,
			type,
			isNormal,
			payer,
			bankCardNumber,
			sort,
			order,
			limit,
		});

		users = await addOnlineStatusToUsers(users);

		res.status(200).json({
			data: {
				users,
			},
			numOfPages,
			numOfItems,
		});
	} catch (error) {
		return next(error);
	}
};
