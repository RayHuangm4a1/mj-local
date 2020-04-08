const {
	disableGoogleTOTPByAccountId
} = require("../../../services/user.admin");

module.exports = async function handleDisableGoogleTOTPBelongToUserRequest(req, res, next) {
	const requestId = req.header("X-Request-Id");
	const { accountId } = res.locals.managedUser;
	const { ip } = req.device;
	const { jwt } = req.user;

	try {
		await disableGoogleTOTPByAccountId(accountId, {
			ip,
			jwt,
			requestId
		});

		res.status(204).end();

		next();
	} catch (error) {
		next(error);
	}
};
