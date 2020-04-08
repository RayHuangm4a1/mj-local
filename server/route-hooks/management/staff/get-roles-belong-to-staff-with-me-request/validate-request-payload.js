module.exports = function validateRequestPayload(req, res, next) {
	if (req.query.me !== '1') {
		return next('route');
	}

	next();
};
