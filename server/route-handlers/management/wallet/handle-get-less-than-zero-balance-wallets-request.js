const {
	getLessThanZeroWalletsByCodeAndPagination,
} = require("../../../services/wallet.admin");

module.exports = async function handleGetLessThanZeroBalanceWalletsRequest(req, res, next) {
	const {
		code, page, limit,
		sort, order,
	} = req.query;

	try {
		const wallets = await getLessThanZeroWalletsByCodeAndPagination(code, page, {
			limit,
			sort,
			order,
		});

		res.status(200).json(wallets);
	} catch (error) {
		next(error);
	}
};
