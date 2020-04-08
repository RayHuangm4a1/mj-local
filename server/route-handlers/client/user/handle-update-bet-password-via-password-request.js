const {
	updateBetPasswordViaPasswordByAccountId,
	updateBetPasswordUpdatedAtById,
} = require("../../../services/user");

module.exports = async function handleUpdateBetPasswordViaPasswordRequest(req, res, next) {
	const { id: userId, accountId } = req.user;
	const requestId = req.header("X-Request-Id");
	const { ip } = req.device;
	const { password, newPassword } = req.body;

	try {
		await updateBetPasswordViaPasswordByAccountId(
			accountId,
			{
				password,
				newPassword,
			},
			{ requestId, ip }
		);

		await updateBetPasswordUpdatedAtById(userId, new Date());

		res.status(204).end();
	} catch (error) {
		next(error);
	}
};
