const {
	updateGreetingById,
} = require("../../../services/user");

module.exports = async function handleUpdateGreetingRequest(req, res, next) {
	const { id } = req.user;
	const { greeting } = req.body;

	try {
		await updateGreetingById(id, greeting);

		res.status(204).end();
	} catch (error) {
		next(error);
	}
};
