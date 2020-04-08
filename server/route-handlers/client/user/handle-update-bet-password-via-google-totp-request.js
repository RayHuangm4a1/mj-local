const {
	updateBetPasswordViaGoogleTOTPByAccountId,
	updateBetPasswordUpdatedAtById,
} = require("../../../services/user");

module.exports = async function handleUpdateBetPasswordViaGoogleTOTPRequest(req, res, next) {
	const { id: userId, accountId } = req.user;
	const requestId = req.header("X-Request-Id");
	const { ip } = req.device;
	const { totp, newPassword } = req.body;

	try {
		await updateBetPasswordViaGoogleTOTPByAccountId(
			accountId,
			{
				newPassword,
				totp
			},
			{ requestId, ip }
		);

		await updateBetPasswordUpdatedAtById(userId, new Date());

		res.status(204).end();
	} catch (error) {
		next(error);
	}
};
