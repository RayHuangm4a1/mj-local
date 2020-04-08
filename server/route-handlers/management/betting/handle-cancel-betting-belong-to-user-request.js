const {
	cancelBettingByIdAndUserId,
} = require("../../../services/betting");
const {
	ENUM_BETTING_CANCELED_TYPE,
} = require("../../../lib/enum");

module.exports = async function handleCancelBettingBelongToUserRequest(req, res, next) {
	const { userId, bettingId } = req.params;

	try {
		const result = await cancelBettingByIdAndUserId(bettingId, userId, ENUM_BETTING_CANCELED_TYPE.CANCELED_BY_STAFF);

		res.status(200).json(result.betting);

		next();
	} catch (error) {
		next(error);
	}
};
