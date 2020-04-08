const {
	getWalletsByUserId,
} = require("../../../services/user.admin");

module.exports = async function handleGetWalletsBelongToUserRequest(req, res, next) {
	const { userId } = req.params;

	try {
		const wallets = await getWalletsByUserId(userId);

		res.status(200).json(wallets);
	} catch (error) {
		next(error);
	}
};
