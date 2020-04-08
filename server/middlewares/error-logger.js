module.exports = function (error, req, res, next) {
	global.LOGGER.error(error.formatStack());

	next(error);
};
