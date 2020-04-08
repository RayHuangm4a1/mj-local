const { blockUserById } = require("../../../services/user");
const { LIMIT_OF_FAILED_LOGIN } = require("../../../services/platform");
const { get } = require("ljit-collection");

async function isNumOfFailedLoginReachLimit(error, req, res, next) {
	if (
		get(error, "options.numOfFailedLogin") === undefined ||
		get(error, "options.user" === undefined)
	) {
		return next(error);
	}

	const { user, numOfFailedLogin } = error.options;
	const requestId = req.header("X-Request-Id");

	try {
		if (numOfFailedLogin >= LIMIT_OF_FAILED_LOGIN) {
			await blockUserById(user.id);
		}
	} catch (error) {
		global.LOGGER.warn(requestId, error.formatStack());
	}

	return next(error);
}

module.exports = {
	isNumOfFailedLoginReachLimit,
};
