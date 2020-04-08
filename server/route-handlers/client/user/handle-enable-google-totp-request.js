const {
	enableGoogleTOTPByAccountId,
} = require("../../../services/user");

module.exports = async function handleEnableGoogleTOTPRequest(req, res, next) {
	const { accountId } = req.user;
	const requestId = req.header("X-Request-Id");
	const { ip } = req.device;
	const { password, secret, totp } = req.body;

	try {
		await enableGoogleTOTPByAccountId(
			accountId,
			{
				password,
				secret,
				totp
			},
			{ requestId, ip }
		);

		res.status(201).end();
	} catch (error) {
		next(error);
	}
};
