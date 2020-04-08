const {
	WALLET_PROJECTIONS,
	getWalletsByUserId,
} = require("../../../services/wallet");

module.exports = async function handleGetWalletsRequest(req, res, next) {
	try {
		const wallets = await getWalletsByUserId(req.user.id, {
			projections: WALLET_PROJECTIONS.MIN,
		});

		res.status(200).json(wallets);
	} catch (error) {
		next(error);
	}
};
