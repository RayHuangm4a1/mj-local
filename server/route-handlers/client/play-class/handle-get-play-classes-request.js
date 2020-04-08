const {
	getPrimaryPlayClasses,
} = require("../../../services/lottery");

module.exports = async function handleGetPlayClassesRequest(req, res, next) {
	try {
		const playClasses = await getPrimaryPlayClasses({
			requestId: req.header("X-Request-Id"),
		});

		res.status(200).json(playClasses);
	} catch (error) {
		next(error);
	}
};
