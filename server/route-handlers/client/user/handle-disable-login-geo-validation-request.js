const { disableLoginGeoValidationByAccountId } = require('../../../services/user');

module.exports = async function handleDisableLoginGeoValidationRequest(req, res, next) {
	const { accountId } = req.user;
	const { totp } = req.body;
	const requestId = req.header('X-Request-Id');
	const { ip } = req.device;

	try {
		await disableLoginGeoValidationByAccountId(accountId, { totp }, { requestId, ip });

		res.status(200).end();
	} catch (error) {
		next(error);
	}
};
