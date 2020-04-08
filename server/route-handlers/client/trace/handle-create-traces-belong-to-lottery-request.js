const {
	createTracesAndBettingsByUserIdAndWalletCode,
} = require("../../../services/betting");

module.exports = async function handleCreateTracesBelongToLotteryRequest(req, res, next) {
	const { helper } = res.locals;
	const { id: userId } = req.user;
	const { walletCode } = req.body;

	try {
		const { wallet, traces } = await createTracesAndBettingsByUserIdAndWalletCode(
			userId,
			walletCode,
			helper.getValidTraces(),
			helper.getBettings()
		);

		helper.fillCreatedTraces(traces);

		if (helper.hasInvalidTraces()) {
			res.status(207).json({ wallet, results: helper.getTraces() });
		} else {
			res.status(201).json({ wallet, results: helper.getTraces() });
		}
	} catch (error) {
		next(error);
	}
};
