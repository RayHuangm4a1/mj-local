
const {
	getWonBettingsGreaterThanUpdatedAtByUserId,
	BETTING_PROJECTIONS,
} = require("../../../../services/betting");

module.exports = async function prepareRecentlyWonBettings(req, res, next) {
	res.locals.user = res.locals.user.toJSON();

	try {
		res.locals.user.bettings = await getWonBettingsGreaterThanUpdatedAtByUserId(res.locals.user.id, req.user.heartbeatAt, {
			projections: BETTING_PROJECTIONS.WON_NOTIFICATION,
			limit: 5,
		});
	} catch (error) {
		return next(error);
	}

	req.user.heartbeatAt = new Date();

	next();
};
