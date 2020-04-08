const {
	getFavoriteLotteryIdsByUserId,
} = require('../../../services/user');

module.exports = async function handleGetFavoriteLotteriesRequest(req, res, next) {
	const { id: userId } = req.user;

	try {
		const lotteryIds = await getFavoriteLotteryIdsByUserId(userId);

		res.status(200).json(lotteryIds);
	} catch (error) {
		next(error);
	}
};
