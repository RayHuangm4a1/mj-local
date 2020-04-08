const {
	validateGoogleTOTPByAccountId,
	validateFundsPasswordByAccountId,
} = require("../../../../services/user");

module.exports = async function validateFundsPasswordAndGoogleTOTP(req, res, next) {
	const requestId = req.header("X-Request-Id");
	const { accountId } = req.user;
	const { ip } = req.device;
	const { totp, password } = req.body;

	try {
		await Promise.all([
			validateGoogleTOTPByAccountId(accountId, totp, { requestId, ip }),
			validateFundsPasswordByAccountId(accountId, password, { requestId, ip }),
		]);

		next();
	} catch (error) {
		next(error);
	}
};
