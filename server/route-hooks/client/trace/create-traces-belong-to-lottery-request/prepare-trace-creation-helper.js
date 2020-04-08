const {
	cloneDeep,
} = require("ljit-collection");
const TraceCreationHelper = require("../../../../lib/trace/trace-creation-helper");

module.exports = function prepareTraceCreationHelper(req, res, next) {
	const orders = cloneDeep(req.body.data);

	res.locals.helper = new TraceCreationHelper(orders);

	next();
};
