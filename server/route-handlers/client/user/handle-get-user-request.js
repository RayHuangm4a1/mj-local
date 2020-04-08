const {
	simplifyPayer,
} = require('../../../lib/user');

module.exports = function handleGetUserRequest(req, res, next) {
	res.locals.user.payer = simplifyPayer(res.locals.user.payer);

	res.status(200).json(res.locals.user);

	next();
};
