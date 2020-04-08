const { isSameTime } = require("ljit-lib/moment-utils");

module.exports = function isBetPasswordUpdated(req, res, next) {
	const { betPasswordUpdatedAt: previousBetPasswordUpdatedAt } = req.user;
	const { betPasswordUpdatedAt: currentBetPasswordUpdatedAt } = res.locals.user;

	if (currentBetPasswordUpdatedAt === null) {
		return next();
	}

	if (!isSameTime(previousBetPasswordUpdatedAt, currentBetPasswordUpdatedAt)) {
		req.user.isBetCredentialsAuthenticated = false;
		req.user.betPasswordUpdatedAt = currentBetPasswordUpdatedAt;
	}

	next();
};
