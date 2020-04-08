module.exports = function handleGetPlatformRequest(req, res) {
	res.status(200).json(res.locals.platform);
};
