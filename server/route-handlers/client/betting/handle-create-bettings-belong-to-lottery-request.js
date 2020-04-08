const {
	createBettingsByUserIdAndWalletCode,
} = require("../../../services/betting");

/**
 * @param {object} res.locals.helper - betting creation helper instance.
 */
module.exports = async function handleCreateBettingsBelongToLotteryRequest(req, res, next) {
	const { helper } = res.locals;
	const { id: userId } = req.user;
	const { walletCode } = req.body;

	try {
		const { wallet, bettings } = await createBettingsByUserIdAndWalletCode(
			userId,
			walletCode,
			helper.getValidBettings()
		);

		helper.fillCreatedBettings(bettings);

		if (helper.hasInvalidBettings()) {
			res.status(207).json({ wallet, results: helper.getBettings() });
		} else {
			res.status(201).json({ wallet, results: helper.getBettings() });
		}
	} catch (error) {
		next(error);
	}
};
