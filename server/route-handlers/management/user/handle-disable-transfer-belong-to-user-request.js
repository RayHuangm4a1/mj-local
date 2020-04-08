const {
	disableUserTransferById,
} = require("../../../services/user.admin");

module.exports = async function handleDisableTransferBelongToUserRequest(req, res, next) {
	const { userId } = req.params;

	try {
		await disableUserTransferById(userId);

		res.status(204).end();

		next();
	} catch (error) {
		next(error);
	}
};
