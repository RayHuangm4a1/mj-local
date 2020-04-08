const {
	cloneDeep,
} = require("ljit-collection");
const { BettingCreationHelper } = require("../../../../lib/betting");

module.exports = function prepareBettingCreationHelper(req, res, next) {
	const orders = cloneDeep(req.body.data);

	res.locals.helper = new BettingCreationHelper(orders);

	next();
};
