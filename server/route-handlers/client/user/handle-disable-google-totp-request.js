const { disableGoogleTOTPByAccountId } = require('../../../services/user');

module.exports = async function handleDisableGoogleTOTPRequest(req, res, next) {
	const { accountId } = req.user;
	const { totp } = req.body;
	const requestId = req.header('X-Request-Id');
	const { ip } = req.device;

	try {
		await disableGoogleTOTPByAccountId(accountId, { totp }, { requestId, ip });

		res.status(200).end();
	} catch (error) {
		next(error);
	}
};
