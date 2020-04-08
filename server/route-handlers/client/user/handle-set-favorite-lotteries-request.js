const {
	setFavoriteLotteryIdsByUserId,
} = require('../../../services/user');

module.exports = async function handleSetFavoriteLotteriesRequest(req, res, next) {
	const { id: userId } = req.user;
	const lotteryIds = req.body;

	try {
		await setFavoriteLotteryIdsByUserId(userId, lotteryIds);

		res.status(204).end();
	} catch (error) {
		next(error);
	}
};
