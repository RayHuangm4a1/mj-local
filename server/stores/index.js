const DEFAULT_MANAGEMENT_LIMIT = 30;

function getOffsetByPageAndLimit(page, limit) {
	return limit * (page - 1);
}

module.exports = {
	getOffsetByPageAndLimit,

	DEFAULT_MANAGEMENT_LIMIT,
};
