module.exports = function validateRequestPayload(req, res, next) {
	if (req.query.me !== '0') {
		return next('route');
	}

	next();
};
