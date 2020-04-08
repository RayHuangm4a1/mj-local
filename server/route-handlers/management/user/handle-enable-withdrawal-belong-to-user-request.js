const {
	enableUserWithdrawalById,
} = require("../../../services/user.admin");

module.exports = async function handleEnableWithdrawalBelongToUserRequest(req, res, next) {
	const { userId } = req.params;

	try {
		await enableUserWithdrawalById(userId);

		res.status(201).end();

		next();
	} catch (error) {
		next();
	}
};
