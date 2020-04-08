const {
	cancelBettingsByTraceIdBettingIdsAndUserId,
} = require("../../../services/betting");
const TraceCreationHelper = require("../../../lib/trace/trace-creation-helper");
const {
	ENUM_BETTING_CANCELED_TYPE,
} = require("../../../lib/enum");

module.exports = async function handleCancelTraceBettingsBelongToUserRequest(req, res, next) {
	const { userId, traceId } = req.params;
	const ids = req.body;

	try {
		const { bettings } = await cancelBettingsByTraceIdBettingIdsAndUserId(traceId, ids, userId, ENUM_BETTING_CANCELED_TYPE.CANCELED_BY_STAFF);

		if (ids.length === bettings.length) {
			res.status(200).json(bettings);
		} else {
			res.status(207).json(TraceCreationHelper.fillCancelableError(ids, bettings));
		}

		next();
	} catch (error) {
		next(error);
	}
};
