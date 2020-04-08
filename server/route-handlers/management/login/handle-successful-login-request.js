/**
 * @param {object} res.locals.user - user.
 */
module.exports = function handleSuccessfulLoginRequest(req, res) {
	res.status(201).json(res.locals.user);
};
