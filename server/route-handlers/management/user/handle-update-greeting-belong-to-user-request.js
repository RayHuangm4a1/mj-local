const {
	updateGreetingById
} = require("../../../services/user.admin");

module.exports = async function handleUpdateGreetingBelongToUserRequest(req, res, next) {
	const { userId } = req.params;
	const { greeting } = req.body;

	try {
		await updateGreetingById(userId, greeting);

		res.status(204).end();

		next();
	} catch (error) {
		next(error);
	}
};
