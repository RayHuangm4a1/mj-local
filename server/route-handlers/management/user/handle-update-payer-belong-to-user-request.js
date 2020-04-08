const {
	updatePayerById,
} = require("../../../services/user.admin");

module.exports = async function handleUpdatePayerBelongToUserRequest(req, res, next) {
	const { userId } = req.params;
	const { payer } = req.body;

	try {
		await updatePayerById(userId, payer);

		res.status(204).end();

		next();
	} catch (error) {
		next(error);
	}
};
