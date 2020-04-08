const {
	enableUserDepositById,
} = require("../../../services/user.admin");

module.exports = async function handleEnableUserDepositBelongToUserRequest(req, res, next) {
	const { userId } = req.params;

	try {
		await enableUserDepositById(userId);

		res.status(201).end();

		next();
	} catch (error) {
		next(error);
	}
};
