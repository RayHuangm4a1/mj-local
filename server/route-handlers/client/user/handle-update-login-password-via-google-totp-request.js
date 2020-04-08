const {
	updateLoginPasswordViaGoogleTOTPByAccountId,
	updateLoginPasswordUpdatedAtById,
} = require("../../../services/user");

module.exports = async function handleUpdateLoginPasswordViaGoogleTOTPRequest(req, res, next) {
	const { id: userId, accountId } = req.user;
	const { ip } = req.device;
	const requestId = req.header("X-Request-Id");
	const { newPassword, totp } = req.body;

	try {
		await updateLoginPasswordViaGoogleTOTPByAccountId(
			accountId,
			{
				newPassword,
				totp
			},
			{ requestId, ip }
		);

		await updateLoginPasswordUpdatedAtById(userId, new Date());

		req.logout();

		res.status(204).end();
	} catch (error) {
		next(error);
	}
};
