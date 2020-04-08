const {
	TRANSACTION_LOG_TYPES,
} = require("../../../transaction-log");

function setDefaultTypes(req, res, next) {
	if (req.query.type === undefined) {
		res.locals.types = TRANSACTION_LOG_TYPES;
	} else {
		res.locals.types = [parseInt(req.query.type)];
	}

	next();
}

module.exports = setDefaultTypes;
