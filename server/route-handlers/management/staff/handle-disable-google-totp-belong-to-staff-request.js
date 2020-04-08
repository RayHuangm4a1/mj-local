const {
	disableGoogleTOTPByAccountId,
} = require("../../../services/staff.admin");

module.exports = async function handleDisableGoogleTOTPBelongToStaffRequest(req, res, next) {
	const requestId = req.header("X-Request-Id");
	const { accountId } = res.locals.managedStaff;
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
