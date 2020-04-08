const {
	NotFoundError,
} = require("ljit-error");
const {
	BETTING_NOT_FOUND,
} = require("../../../lib/error/code");
const {
	getTraceByIdAndUserId,
} = require("../../../services/betting");

module.exports = async function handleGetTraceRequest(req, res, next) {
	const { id: userId } = req.user;
	const { traceId } = req.params;

	try {
		const trace = await getTraceByIdAndUserId(traceId, userId);

		if (trace === null) {
			throw new NotFoundError(BETTING_NOT_FOUND.MESSAGE, BETTING_NOT_FOUND.CODE);
		}

		res.status(200).json(trace);
	} catch (error) {
		next(error);
	}
};
