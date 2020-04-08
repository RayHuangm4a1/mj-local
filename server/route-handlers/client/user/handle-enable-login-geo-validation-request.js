const { enableLoginGeoValidationByAccountId } = require('../../../services/user');

module.exports = async function handleEnableLoginGeoValidationRequest(req, res, next) {
	const { accountId } = req.user;
	const requestId = req.header('X-Request-Id');
	const { ip } = req.device;

	try {
		await enableLoginGeoValidationByAccountId(accountId, { requestId, ip });

		res.status(201).end();
	} catch (error) {
		next(error);
	}
};
