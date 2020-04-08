module.exports = function handleGetAccountBelongToUserRequest(req, res,) {
	res.status(200).json(res.locals.managedAccount);
};
