const {
	getLevels,
} = require("../../../services/level.admin");

module.exports = async function handleGetLevelsRequest(req, res, next) {
	try {
		const result = await getLevels();

		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};
