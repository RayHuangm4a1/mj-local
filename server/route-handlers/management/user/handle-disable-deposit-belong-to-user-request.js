const {
	disableUserDepositById,
} = require("../../../services/user.admin");

module.exports = async function handleDisableDepositBelongToUserRequest(req, res, next) {
	const { userId } = req.params;

	try {
		await disableUserDepositById(userId);

		res.status(200).end();

		next();
	} catch (error) {
		next(error);
	}
};
