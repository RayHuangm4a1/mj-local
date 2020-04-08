const {
	cancelBettingsByTraceIdBettingIdsAndUserId,
} = require("../../../services/betting");
const TraceCreationHelper = require("../../../lib/trace/trace-creation-helper");
const {
	ENUM_BETTING_CANCELED_TYPE,
} = require("../../../lib/enum");

module.exports = async function handleCancelTraceBettingsRequest(req, res, next) {
	const { id: userId } = req.user;
	const { traceId } = req.params;
	const ids = req.body;

	try {
		const { wallet, bettings } = await cancelBettingsByTraceIdBettingIdsAndUserId(traceId, ids, userId, ENUM_BETTING_CANCELED_TYPE.CANCELED_BY_USER);

		if (ids.length === bettings.length) {
			res.status(200).json({ wallet, results: bettings });
		} else {
			res.status(207).json({
				wallet,
				results: TraceCreationHelper.fillCancelableError(ids, bettings),
			});
		}
	} catch (error) {
		next(error);
	}
};
