const {
	updateLoginPasswordViaPasswordByAccountId,
	updateLoginPasswordUpdatedAtById,
} = require("../../../services/user");

module.exports = async function handleUpdateLoginPasswordViaPasswordRequest(req, res, next) {
	const { id: userId, accountId } = req.user;
	const { ip } = req.device;
	const requestId = req.header("X-Request-Id");
	const { password, newPassword } = req.body;

	try {
		await updateLoginPasswordViaPasswordByAccountId(
			accountId,
			{
				password,
				newPassword,
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
