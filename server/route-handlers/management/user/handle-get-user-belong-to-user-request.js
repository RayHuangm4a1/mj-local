module.exports = function handleGetUserBelongToUserRequest(req, res) {
	res.status(200).json(res.locals.managedUser);
};
