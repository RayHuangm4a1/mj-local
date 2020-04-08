module.exports = function prepareDeltaBonus(req, res, next) {
	const { bonus } = req.body;
	const deltaBonus = bonus - res.locals.platform.bonus.max;

	res.locals.preparedDeltaBonus = deltaBonus;

	next();
};
