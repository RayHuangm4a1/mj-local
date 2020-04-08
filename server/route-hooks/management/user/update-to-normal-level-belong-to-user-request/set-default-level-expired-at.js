module.exports = function setDefaultLevelExpiredAt(req, res, next) {
	if (req.body.levelExpiredAt === undefined) {
		req.body.levelExpiredAt = new Date();
	} else {
		req.body.levelExpiredAt = new Date(req.body.levelExpiredAt);
	}

	next();
};