const {
	updateFundsPasswordViaGoogleTOTPByAccountId,
} = require("../../../services/user");

module.exports = async function handleUpdateFundsPasswordViaGoogleTOTPRequest(req, res, next) {
	const { accountId } = req.user;
	const requestId = req.header("X-Request-Id");
	const { ip } = req.device;
	const { totp, newPassword } = req.body;

	try {
		await updateFundsPasswordViaGoogleTOTPByAccountId(
			accountId,
			{
				newPassword,
				totp
			},
			{ requestId, ip }
		);

		res.status(204).end();
	} catch (error) {
		next(error);
	}
};
