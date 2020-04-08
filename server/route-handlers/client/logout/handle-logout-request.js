module.exports = function handleLogoutRequest(req, res) {
	req.logout();

	res.status(201).end();
};