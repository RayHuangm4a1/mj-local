const {
	updateTagsAndOrderingsOfPrimaryLotteriesByLotteryClassId,
} = require("../../../services/lottery.admin");

module.exports = async function handleUpdateTagsAndOrderingsOfLotteriesRequest(req, res, next) {
	const requestId = req.header("X-Request-Id");
	const { jwt } = req.user;
	const { lotteryClassId } = req.params;
	const documents = req.body;

	try {
		await updateTagsAndOrderingsOfPrimaryLotteriesByLotteryClassId(lotteryClassId, documents, { requestId, jwt });

		res.status(204).end();

		next();
	} catch (error) {
		next(error);
	}
};
