const {
	disableUserFundsById,
} = require("../../../services/user.admin");

module.exports = async function handleDisableFundsBelongToUserRequest(req, res, next) {
	const { userId } = req.params;

	try {
		await disableUserFundsById(userId);

		res.status(200).end();

		next();
	} catch (error) {
		next(error);
	}
};
