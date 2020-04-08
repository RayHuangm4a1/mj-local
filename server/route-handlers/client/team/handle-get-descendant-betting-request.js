const {
	getBettingByIdAndUserId,
} = require("../../../services/betting");
const {
	NotFoundError,
} = require("ljit-error");
const {
	BETTING_NOT_FOUND,
} = require("../../../lib/error/code");

module.exports = async function handleGetDescendantBettingRequest(req, res, next) {
	const { bettingId, memberId } = req.params;

	try {
		const betting = await getBettingByIdAndUserId(bettingId, memberId);

		if (betting === null) {
			throw new NotFoundError(
				BETTING_NOT_FOUND.MESSAGE,
				BETTING_NOT_FOUND.CODE
			);
		}

		res.status(200).json(betting);
	} catch (error) {
		next(error);
	}
};
