const { getPlatform } = require("../../../services/platform");

module.exports = async function handleGetPlatformRequest(req, res, next) {
	try {
		const platform = await getPlatform();

		res.status(200).json(platform);
	} catch (error) {
		next(error);
	}
};
