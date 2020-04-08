const {
	DIVIDEND_TRANSACTION_LOG_TYPES,
} = require("../../../transaction-log");

function setDefaultTypes(req, res, next) {
	if (req.query.type === undefined) {
		res.locals.types = DIVIDEND_TRANSACTION_LOG_TYPES;
	} else {
		res.locals.types = req.query.type.split(',').map(Number);
	}

	next();
}

module.exports = setDefaultTypes;
