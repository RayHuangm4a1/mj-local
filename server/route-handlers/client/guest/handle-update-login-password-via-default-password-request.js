const {
	updateLoginPasswordViaPasswordByAccountId,
	updateLoginPasswordUpdatedAtById,
} = require("../../../services/user");

module.exports = async function handleUpdateLoginPasswordViaDefaultPasswordRequest(req, res, next) {
	const { userId, accountId } = req.session.guest;
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

		res.status(201).end();
	} catch (error) {
		next(error);
	}
};
