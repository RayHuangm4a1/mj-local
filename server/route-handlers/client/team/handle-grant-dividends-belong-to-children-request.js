const {
	grantDividendsByAncestorIdWalletCodeDurationIdAndChildrenId,
} = require("../../../services/dividend");

module.exports = async function handleGrantDividendsBelongToChildrenRequest(req, res, next) {
	const { amount, walletCode: ancestorWalletCode } = req.body;
	const { id: ancestorId } = req.user;
	const { userId: childrenId, durationId } = res.locals.childrenTeamDurationStats;

	try {
		const { ancestorWallet, childrenWithTeamDurationStats } = await grantDividendsByAncestorIdWalletCodeDurationIdAndChildrenId(
			ancestorId,
			ancestorWalletCode,
			durationId,
			childrenId,
			amount,
		);

		res.status(201).json({
			wallet: ancestorWallet,
			result: childrenWithTeamDurationStats,
		});
	} catch (error) {
		next(error);
	}
};
