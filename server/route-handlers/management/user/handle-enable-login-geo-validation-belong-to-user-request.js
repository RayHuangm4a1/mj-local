const {
	enableLoginGeoValidationByAccountId,
} = require("../../../services/user.admin");

module.exports = async function handleEnableLoginGeoValidationBelongToUserRequest(req, res, next) {
	const requestId = req.header("X-Request-Id");
	const { accountId } = res.locals.managedUser;
	const { ip } = req.device;
	const { jwt } = req.user;

	try {
		await enableLoginGeoValidationByAccountId(accountId, {
			ip,
			jwt,
			requestId
		});

		res.status(201).end();

		next();
	} catch (error) {
		next(error);
	}
};
