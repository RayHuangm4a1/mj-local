const {
	ENUM_DIVIDEND_STATUS,
} = require("../../../../lib/enum");

module.exports = function setDefaultStatus(req, res, next) {
	req.query.status = req.query.status !== undefined ?
		[parseInt(req.query.status)] :
		Object.values(ENUM_DIVIDEND_STATUS);

	next();
};
