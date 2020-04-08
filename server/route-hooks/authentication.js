const passport = require("../passport");
const {
	validateBetPasswordByAccountId,
	validateLoginPasswordByAccountId,
	validateFundsPasswordByAccountId,
} = require("../services/user");

function authenticateClientLoginCredentials(req, res, next) {
	const strategy = passport.LOGIN_STRATEGY.PASSWORD;

	return passport.authenticateClientCredentials(strategy, req, res, next);
}

function authenticateManagementLoginCredentials(req, res, next) {
	const strategy = passport.LOGIN_STRATEGY.PASSWORD;

	return passport.authenticateManagementCredentials(strategy, req, res, next);
}

function authenticateClientGoogleTOTPLoginCredentials(req, res, next) {
	const strategy = passport.LOGIN_STRATEGY.GOOGLE_TOTP;

	return passport.authenticateClientCredentials(strategy, req, res, next);
}

async function authenticateBetPassword(req, res, next) {
	const requestId = req.header("X-Request-Id");
	const { ip } = req.device;
	const { password } = req.body;
	const { accountId } = req.user;

	if (req.user.isBetCredentialsAuthenticated) {
		return next();
	}

	try {
		await validateBetPasswordByAccountId(accountId, password, { requestId, ip });

		req.user.isBetCredentialsAuthenticated = true;

		next();
	} catch (error) {
		next(error);
	}
}

async function authenticateLoginPassword(req, res, next) {
	const requestId = req.header("X-Request-Id");
	const { ip } = req.device;
	const { accountId } = req.user;
	const { password } = req.body;

	try {
		await validateLoginPasswordByAccountId(accountId, password, { requestId, ip });

		next();
	} catch (error) {
		next(error);
	}
}

async function authenticateFundsPassword(req, res, next) {
	const requestId = req.header("X-Request-Id");
	const { ip } = req.device;
	const { accountId } = req.user;
	const { password } = req.body;

	try {
		await validateFundsPasswordByAccountId(accountId, password, { requestId, ip });

		next();
	} catch (error) {
		next(error);
	}
}

module.exports = {
	authenticateClientLoginCredentials,
	authenticateClientGoogleTOTPLoginCredentials,
	authenticateManagementLoginCredentials,
	authenticateBetPassword,
	authenticateLoginPassword,
	authenticateFundsPassword,
};
