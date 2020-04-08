const {
	cancelBettingByIdAndUserId,
} = require("../../../services/betting");
const {
	ENUM_BETTING_CANCELED_TYPE,
} = require("../../../lib/enum");

module.exports = async function handleCancelBettingRequest(req, res, next) {
	const { id: userId } = req.user;
	const { bettingId } = req.params;

	try {
		const { wallet, betting } = await cancelBettingByIdAndUserId(bettingId, userId, ENUM_BETTING_CANCELED_TYPE.CANCELED_BY_USER);

		res.status(200).json({ wallet, result: betting });
	} catch (error) {
		next(error);
	}
};
