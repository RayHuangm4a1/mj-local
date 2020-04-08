const {
	updateFundsPasswordViaPasswordByAccountId,
} = require("../../../services/user");

module.exports = async function handleUpdateFundsPasswordViaPasswordRequest(req, res, next) {
	const { accountId } = req.user;
	const requestId = req.header("X-Request-Id");
	const { ip } = req.device;
	const { password, newPassword } = req.body;

	try {
		await updateFundsPasswordViaPasswordByAccountId(
			accountId,
			{
				password,
				newPassword,
			},
			{ requestId, ip }
		);

		res.status(204).end();
	} catch (error) {
		next(error);
	}
};
