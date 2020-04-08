const { validateLoginGeoByAccountId } = require('../../../services/user');

module.exports = async function handleLoginGeoValidationRequest(req, res, next) {
	const requestId = req.header('X-Request-Id');
	const { ip } = req.device;
	const { greeting, accountId } = res.locals.user;

	try {
		const isEqualToPreviousLoginGeo = await validateLoginGeoByAccountId(accountId, { requestId, ip });

		if (isEqualToPreviousLoginGeo) {
			res.status(200).json({ greeting });
		} else {
			res.status(303).end();
		}
	} catch (error) {
		next(error);
	}
};
