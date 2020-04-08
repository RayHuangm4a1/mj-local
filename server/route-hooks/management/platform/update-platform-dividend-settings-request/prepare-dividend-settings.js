const { pick } = require("ljit-collection");

module.exports = function prepareDividendSettings(req, res, next) {
	res.locals.dividendSettings = req.body.map(
		dividendSetting => pick(dividendSetting, ["amount", "ratio"])
	);

	next();
};
