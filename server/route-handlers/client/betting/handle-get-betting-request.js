const { NotFoundError } = require("ljit-error");
const {
	BETTING_NOT_FOUND,
} = require("../../../lib/error/code");
const {
	BETTING_PROJECTIONS,
	getBettingByIdAndUserId,
} = require("../../../services/betting");

module.exports = async function handleGetBettingRequest(req, res, next) {
	const { id: userId } = req.user;
	const { bettingId } = req.params;

	try {
		const betting = await getBettingByIdAndUserId(bettingId, userId, {
			projections: BETTING_PROJECTIONS.IGNORE_ANCESTORS_AND_AWARD,
		});

		if (betting === null) {
			throw new NotFoundError(BETTING_NOT_FOUND.MESSAGE, BETTING_NOT_FOUND.CODE);
		}

		res.status(200).json(betting);
	} catch (error) {
		next(error);
	}
};
