const { generateWithdrawalFee } = require("../../../../lib/withdrawal");

module.exports = function prepareFeeByPlatform(req, res, next) {
	const { amount } = req.body;
	const { userStats } = res.locals.user;
	const [userDailyStats] = res.locals.user.userDailyStatses;
	const { platform } = res.locals;

	try {
		res.locals.feeByPlatform = generateWithdrawalFee({
			amount,
			userStats,
			userDailyStats,
			platform,
		});
	} catch (error) {
		return next(error);
	}

	next();
};
