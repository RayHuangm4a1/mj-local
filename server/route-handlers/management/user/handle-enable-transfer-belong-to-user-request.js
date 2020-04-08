const {
	enableUserTransferById,
} = require("../../../services/user.admin");

module.exports = async function handleEnableTransferBelongToUserRequest(req, res, next) {
	const { userId } = req.params;

	try {
		await enableUserTransferById(userId);

		res.status(201).end();

		next();
	} catch (error) {
		next(error);
	}
};
