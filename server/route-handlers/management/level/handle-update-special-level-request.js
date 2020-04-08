const {
	updateLevelById,
} = require('../../../services/level.admin');

module.exports = async function handleUpdateSpecialLevelRequest(req, res, next) {
	const { name, status } = req.body;

	try {
		await updateLevelById(req.params.levelId, { name, status });

		res.status(204).end();

		next();
	} catch (error) {
		next(error);
	}
};
