const {
	getTraceByIdAndUserId,

	TRACE_PROJECTIONS,
} = require("../../../services/betting");
const {
	NotFoundError,
} = require("ljit-error");
const {
	TRACE_NOT_FOUND,
} = require("../../../lib/error/code");

module.exports = async function handleGetDescendantTraceRequest(req, res, next) {
	const { memberId, traceId } = req.params;

	try {
		const trace = await getTraceByIdAndUserId(traceId, memberId, {
			projections: TRACE_PROJECTIONS.TRACE,
		});

		if (trace === null) {
			throw new NotFoundError(
				TRACE_NOT_FOUND.MESSAGE,
				TRACE_NOT_FOUND.CODE
			);
		}

		res.status(200).json(trace);
	} catch (error) {
		next(error);
	}
};
