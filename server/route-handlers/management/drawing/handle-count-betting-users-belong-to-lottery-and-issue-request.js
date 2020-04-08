const {
	countBettingUsersByLotteryIdAndIssue,
} = require("../../../services/betting.admin");

module.exports = async function handleCountBettingUsersBelongToLotteryAndIssueRequest(req, res, next) {
	const { lotteryId, issue } = req.params;

	try {
		const count = await countBettingUsersByLotteryIdAndIssue(lotteryId, issue);

		res.status(200).json({ count });
	} catch (error) {
		next(error);
	}
};
