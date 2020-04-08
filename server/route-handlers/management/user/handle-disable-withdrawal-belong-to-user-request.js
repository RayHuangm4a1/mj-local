const {
	disableUserWithdrawalById,
} = require("../../../services/user.admin");

module.exports = async function handleDisableWithdrawalBelongToUserRequest(req, res, next) {
	const { userId } = req.params;

	try {
		await disableUserWithdrawalById(userId);

		res.status(204).end();

		next();
	} catch (error) {
		next(error);
	}
};
